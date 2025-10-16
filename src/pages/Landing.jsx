import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Landing() {
  const nav = useNavigate();

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data.session || localStorage.getItem("guest") === "1") nav("/dashboard", { replace: true });
    });
    return () => { active = false; };
  }, [nav]);

  async function signInWithGoogle() {
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/dashboard`,
        queryParams: { prompt: "select_account" }
      }
    });
  }

  function signInAsGuest() {
    localStorage.setItem("guest", "1");
    nav("/dashboard", { replace: true });
  }

  return (
    <section className="hero-wrap relative">
      <div className="absolute inset-0 bg-grid"></div>
      <div className="relative container-xl py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl tracking-tight">
              Find recipes fast. Cook with confidence.
            </h1>
            <p className="mt-4 text-neutral-700">
              Search by name, open distraction‑free recipe pages with images and ingredients, and star your favorites to revisit from your dashboard anytime.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={signInWithGoogle} className="btn">Sign in with Google</button>
              <button onClick={signInAsGuest} className="btn-ghost">Continue as guest</button>
              <Link to="/about" className="link-und">Learn more</Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-5 fx-border hover-raise">
              <div className="text-sm text-neutral-500">Search</div>
              <div className="mt-2 text-lg">Lightning‑fast lookup by dish name</div>
            </div>
            <div className="card p-5 fx-border hover-raise">
              <div className="text-sm text-neutral-500">Favorites</div>
              <div className="mt-2 text-lg">Star recipes and return in one tap</div>
            </div>
            <div className="card p-5 fx-border hover-raise">
              <div className="text-sm text-neutral-500">Monochrome UI</div>
              <div className="mt-2 text-lg">Clean, content‑first reading experience</div>
            </div>
            <div className="card p-5 fx-border hover-raise">
              <div className="text-sm text-neutral-500">Access</div>
              <div className="mt-2 text-lg">Sign in with Google or browse as guest</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
