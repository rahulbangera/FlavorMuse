import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { fetchAyurAll } from "../api-ayur";
import { getFavorites, toggleFavorite, onFavoritesChange } from "../lib/favorites";

function displayName(u) { const m = u?.user_metadata || {}; return m.full_name || m.name || (u?.email ? u.email.split("@")[0] : "Guest"); }
function avatarUrl(u) { return u?.user_metadata?.avatar_url || ""; }
function norm(s) { return String(s || "").trim().replace(/\s+/g, " "); }

async function getBundledNames() {
  try {
    const r = await fetch("/data/recipes.json", { cache: "no-store" });
    if (!r.ok) throw new Error();
    const arr = await r.json();
    return Array.isArray(arr) ? arr.map(norm) : [];
  } catch { return []; }
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [names, setNames] = useState([]);
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [favs, setFavs] = useState(() => getFavorites());
  const [favSet, setFavSet] = useState(() => new Set(favs.map(f => f.name)));
  const [pageSize, setPageSize] = useState(5);
  const [visible, setVisible] = useState(pageSize);

  useEffect(() => {
    let alive = true;
    supabase.auth.getUser().then(({ data }) => { if (!alive) return; setUser(data.user ?? null); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { if (!alive) return; setUser(s?.user ?? null); });

    (async () => {
      try {
        setLoading(true);
        const list = await fetchAyurAll();
        if (!alive) return;
        const useList = list.length ? list : await getBundledNames();
        setNames(dedupeAndSort(useList));
      } catch (e) {
        const fallback = await getBundledNames();
        if (!alive) return;
        setNames(dedupeAndSort(fallback));
        setErr(e.message || "Failed to load list");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    const off = onFavoritesChange(() => { const all = getFavorites(); setFavs(all); setFavSet(new Set(all.map(f => f.name))); });
    return () => { alive = false; sub?.subscription?.unsubscribe?.(); off?.(); };
  }, []);

  function dedupeAndSort(arr) {
    const set = new Set(), out = [];
    for (const n of arr) { const s = norm(n); if (!s || set.has(s)) continue; set.add(s); out.push(s); }
    out.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    return out;
  }

  async function signOut() {
    localStorage.removeItem("guest");
    await supabase.auth.signOut();
    window.location.assign("/");
  }

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return !t ? names : names.filter(n => n.toLowerCase().includes(t));
  }, [names, q]);

  useEffect(() => {
    setVisible(pageSize);
  }, [pageSize, q, names]);

  const showing = filtered.slice(0, visible);
  const total = filtered.length;
  const canShowMore = visible < total;

  const name = displayName(user);
  const avatar = avatarUrl(user);
  const isGuest = !user && localStorage.getItem("guest") === "1";

  return (
    <section className="container-xl py-12">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            {avatar ? (
              <img
                referrerPolicy="no-referrer"
                src={avatar}
                alt={name}
                className="h-full w-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            ) : (
              <div className="text-sm">{name.slice(0, 2).toUpperCase()}</div>
            )}
          </div>
          <div>
            <div className="text-2xl tracking-tight">Welcome, {isGuest ? "Guest" : name}.</div>
            <div className="text-neutral-600 text-sm">{isGuest ? "Guest mode" : "Signed in with Google"}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/favorites" className="btn" aria-label="View favorites">Favorites</Link>
          <button onClick={signOut} className="btn">Logout</button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            className="field"
            placeholder="Search recipes…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search recipes"
          />
          <div className="flex items-center gap-3">
            <label className="text-sm text-neutral-600">Show per click</label>
            <select
              className="field !w-auto"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              aria-label="Recipes per click"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
        {err ? <div className="mt-2 text-sm text-neutral-500">{err}</div> : null}
        <div className="mt-2 text-sm text-neutral-600">
          Showing {Math.min(visible, total)} of {total}
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center">Loading…</div>
      ) : (
        <>
          <div className="mt-6 grid-cards">
            {showing.map((n) => (
              <div key={n} className="card p-6 relative">
                <button
                  className="absolute right-3 top-3 rounded-full border border-neutral-300 px-3 py-1 text-sm bg-white"
                  aria-label={`Toggle favorite ${n}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite({ name: n, image: "" });
                    const all = getFavorites();
                    setFavs(all);
                    setFavSet(new Set(all.map(f => f.name)));
                  }}
                >
                  {favSet.has(n) ? "★" : "☆"}
                </button>
                <Link to={`/recipe/${n}`} className="block">
                  <div className="text-sm text-neutral-500">Recipe</div>
                  <div className="mt-2 text-xl">{n}</div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {canShowMore && (
              <button
                className="btn"
                onClick={() => setVisible(v => Math.min(v + pageSize, total))}
              >
                Show {Math.min(pageSize, total - visible)} more
              </button>
            )}
            {visible < total ? (
              <button className="btn-ghost" onClick={() => setVisible(total)}>
                Show all
              </button>
            ) : total > pageSize ? (
              <button className="btn-ghost" onClick={() => setVisible(pageSize)}>
                Collapse
              </button>
            ) : null}
          </div>
        </>
      )}

      {!loading && !filtered.length && (
        <div className="p-8 text-center text-neutral-600">No matching recipes</div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-xl">Your favorites ({favs.length})</h2>
        <Link to="/favorites" className="link-und">View all</Link>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favs.slice(0, 6).map((f) => (
          <div key={f.name} className="card overflow-hidden relative">
            <button
              className="absolute right-3 top-3 rounded-full border border-neutral-300 px-3 py-1 text-sm bg-white"
              aria-label={`Toggle favorite ${f.name}`}
              onClick={() => {
                toggleFavorite({ name: f.name, image: f.image || "" });
                const all = getFavorites();
                setFavs(all);
                setFavSet(new Set(all.map(x => x.name)));
              }}
            >
              ★
            </button>
            <Link to={`/recipe/${f.name}`} className="block">
              <div className="aspect-[16/9] bg-neutral-100 overflow-hidden">
                {f.image ? (
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : null}
              </div>
              <div className="p-5">
                <div className="text-lg">{f.name}</div>
              </div>
            </Link>
          </div>
        ))}
        {!favs.length && <div className="p-6 text-neutral-600">No favorites yet</div>}
      </div>
    </section>
  );
}
