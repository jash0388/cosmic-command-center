import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth-store";

export type Device = {
  id: string;
  user_id: string;
  name: string;
  type: "desktop" | "mobile";
  os: string;
  status: "online" | "idle" | "offline";
  latency_ms: number;
  last_seen_at: string;
  created_at: string;
};

export function useDevices() {
  const user = useAuthStore((s) => s.user);
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["devices", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Device[]> => {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Device[];
    },
  });

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("devices-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "devices" }, () => {
        qc.invalidateQueries({ queryKey: ["devices", user.id] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, qc]);

  return query;
}

export function useAddDevice() {
  const user = useAuthStore((s) => s.user);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { name: string; type: "desktop" | "mobile"; os: string }) => {
      if (!user) throw new Error("Not signed in");
      const { data, error } = await supabase
        .from("devices")
        .insert({
          user_id: user.id,
          name: input.name,
          type: input.type,
          os: input.os,
          status: "offline",
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["devices"] }),
  });
}

export function useUpdateDevice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id: string; patch: Partial<Pick<Device, "name" | "status" | "latency_ms">> }) => {
      const { error } = await supabase
        .from("devices")
        .update({ ...input.patch, last_seen_at: new Date().toISOString() })
        .eq("id", input.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["devices"] }),
  });
}

export function useDeleteDevice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("devices").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["devices"] }),
  });
}