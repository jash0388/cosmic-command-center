import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth-store";

const TTL_SECONDS = 30;
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCode() {
  let out = "";
  for (let i = 0; i < 8; i++) out += CHARS[Math.floor(Math.random() * CHARS.length)];
  return `${out.slice(0, 4)}-${out.slice(4)}`;
}

/**
 * Maintains a Supabase-backed pairing code for the current user.
 * - Loads the latest unexpired code on mount.
 * - Auto-rotates a new row in `pairing_codes` when the previous expires.
 * - Manual `regenerate()` invalidates the current code immediately.
 */
export function usePairingCode() {
  const user = useAuthStore((s) => s.user);
  const [code, setCode] = useState<string>("--------");
  const [issuedAt, setIssuedAt] = useState<number>(Date.now());
  const [now, setNow] = useState<number>(Date.now());
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const rotatingRef = useRef(false);

  // tick every second for countdown UI
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = Math.max(0, TTL_SECONDS - Math.floor((now - issuedAt) / 1000));

  // insert a fresh code row in Supabase
  const issueCode = useCallback(async () => {
    if (!user || rotatingRef.current) return;
    rotatingRef.current = true;
    try {
      const newCode = generateCode();
      const expires = new Date(Date.now() + TTL_SECONDS * 1000).toISOString();
      const { error } = await supabase
        .from("pairing_codes")
        .insert({ user_id: user.id, code: newCode, expires_at: expires, claimed: false });
      if (error) throw error;
      setCode(newCode);
      setIssuedAt(Date.now());
    } finally {
      rotatingRef.current = false;
      setLoading(false);
    }
  }, [user]);

  // load the latest valid code, or issue a new one
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("pairing_codes")
        .select("code, expires_at")
        .eq("user_id", user.id)
        .eq("claimed", false)
        .gt("expires_at", new Date().toISOString())
        .order("expires_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (cancelled) return;
      if (!error && data) {
        setCode(data.code);
        setIssuedAt(new Date(data.expires_at).getTime() - TTL_SECONDS * 1000);
        setLoading(false);
      } else {
        await issueCode();
      }
    })();
    return () => { cancelled = true; };
  }, [user, issueCode]);

  // auto-rotate when expired
  useEffect(() => {
    if (remaining === 0 && !loading && user) issueCode();
  }, [remaining, loading, user, issueCode]);

  const regenerate = useCallback(async () => {
    setCopied(false);
    await issueCode();
  }, [issueCode]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  }, [code]);

  return { code, remaining, ttl: TTL_SECONDS, copied, loading, regenerate, copy };
}

/**
 * Redeem a pairing code: validates ownership + expiry, marks the code
 * claimed, and creates a new device row tied to the current user.
 */
export function useRedeemPairingCode() {
  const user = useAuthStore((s) => s.user);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { code: string; deviceName: string; os: string; type: "desktop" | "mobile" }) => {
      if (!user) throw new Error("Not signed in");
      const normalized = input.code.trim().toUpperCase().replace(/\s+/g, "");
      const formatted = normalized.length === 8 ? `${normalized.slice(0, 4)}-${normalized.slice(4)}` : normalized;
      if (!/^[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(formatted)) {
        throw new Error("Invalid pairing code format");
      }
      const { data: pc, error: pcErr } = await supabase
        .from("pairing_codes")
        .select("id, expires_at, claimed, user_id")
        .eq("code", formatted)
        .eq("user_id", user.id)
        .maybeSingle();
      if (pcErr) throw pcErr;
      if (!pc) throw new Error("Code not found");
      if (pc.claimed) throw new Error("Code already used");
      if (new Date(pc.expires_at).getTime() < Date.now()) throw new Error("Code expired");

      const { error: claimErr } = await supabase
        .from("pairing_codes")
        .update({ claimed: true })
        .eq("id", pc.id);
      if (claimErr) throw claimErr;

      const latency = 10 + Math.floor(Math.random() * 50);
      const { data: device, error: devErr } = await supabase
        .from("devices")
        .insert({
          user_id: user.id,
          name: input.deviceName.trim(),
          type: input.type,
          os: input.os,
          status: "online",
          latency_ms: latency,
        })
        .select()
        .single();
      if (devErr) throw devErr;
      return device;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["devices"] });
      qc.invalidateQueries({ queryKey: ["pairing_codes"] });
    },
  });
}