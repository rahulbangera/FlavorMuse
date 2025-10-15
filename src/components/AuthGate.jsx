import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
export default function AuthGate() {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      const guest = localStorage.getItem("guest") === "1";
      setOk(!!data.session || guest);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      const guest = localStorage.getItem("guest") === "1";
      setOk(!!s || guest);
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, []);
  if (loading) return <div className="p-16 text-center">Loading…</div>;
  if (!ok) return <Navigate to="/" replace />;
  return <Outlet />;
}
