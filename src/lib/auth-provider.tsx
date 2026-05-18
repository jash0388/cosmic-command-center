import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "./auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setSession = useAuthStore((s) => s.setSession);
  const setLoading = useAuthStore((s) => s.setLoading);
  const qc = useQueryClient();

  useEffect(() => {
    // Set up listener BEFORE getSession (Supabase requirement)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      qc.invalidateQueries();
    });

    setLoading(true);
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    return () => subscription.unsubscribe();
  }, [setSession, setLoading, qc]);

  return <>{children}</>;
}

export function useAuth() {
  return useAuthStore();
}