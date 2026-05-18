import { useCallback, useEffect, useState } from "react";

const TTL_SECONDS = 30;

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `${out.slice(0, 4)}-${out.slice(4)}`;
}

export function usePairingCode() {
  const [code, setCode] = useState(() => generateCode());
  const [issuedAt, setIssuedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = Math.max(0, TTL_SECONDS - Math.floor((now - issuedAt) / 1000));

  useEffect(() => {
    if (remaining === 0) {
      setCode(generateCode());
      setIssuedAt(Date.now());
    }
  }, [remaining]);

  const regenerate = useCallback(() => {
    setCode(generateCode());
    setIssuedAt(Date.now());
    setCopied(false);
  }, []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  }, [code]);

  return { code, remaining, ttl: TTL_SECONDS, copied, regenerate, copy };
}