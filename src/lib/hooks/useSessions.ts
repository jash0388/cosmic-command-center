import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth-store";

export type DeviceSession = {
  id: string;
  user_id: string;
  device_id: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number;
  latency_ms: number;
};

export function useSessions() {
  const user = useAuthStore((s) => s.user);
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["sessions", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<DeviceSession[]> => {
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as DeviceSession[];
    },
  });

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("sessions-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "sessions" }, () => {
        qc.invalidateQueries({ queryKey: ["sessions", user.id] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, qc]);

  return query;
}

export function useStartSession() {
  const user = useAuthStore((s) => s.user);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (deviceId: string) => {
      if (!user) throw new Error("Not signed in");
      // Mark device online with random latency
      const latency = 10 + Math.floor(Math.random() * 60);
      await supabase
        .from("devices")
        .update({ status: "online", latency_ms: latency, last_seen_at: new Date().toISOString() })
        .eq("id", deviceId);
      const { data, error } = await supabase
        .from("sessions")
        .insert({
          user_id: user.id,
          device_id: deviceId,
          latency_ms: latency,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["devices"] });
    },
  });
}

export function useEndSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { sessionId: string; deviceId: string; startedAt: string }) => {
      const duration = Math.max(1, Math.round((Date.now() - new Date(input.startedAt).getTime()) / 1000));
      await supabase
        .from("sessions")
        .update({ ended_at: new Date().toISOString(), duration_seconds: duration })
        .eq("id", input.sessionId);
      await supabase
        .from("devices")
        .update({ status: "idle", last_seen_at: new Date().toISOString() })
        .eq("id", input.deviceId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["devices"] });
    },
  });
}