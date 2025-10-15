import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAyurRecipeNormalized } from "../api-ayur";
import { isFavorite, toggleFavorite, onFavoritesChange } from "../lib/favorites";

export default function RecipeDetail() {
  const { name } = useParams();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setStatus("loading");
        const d = await fetchAyurRecipeNormalized(name || "");
        if (!alive) return;
        setData(d);
        setFav(isFavorite(d.name));
        setStatus("done");
      } catch (e) {
        if (!alive) return;
        setError(e.message || "Failed to load recipe"); setStatus("error");
      }
    })();
    const off = onFavoritesChange(() => { if (data) setFav(isFavorite(data.name)); });
    return () => { alive = false; off?.(); };
  }, [name]); // data refreshes once loaded

  function onToggle() {
    if (!data) return;
    toggleFavorite({ name: data.name, image: data.image });
    setFav(isFavorite(data.name));
  }

  if (status === "loading") return <div className="p-16 text-center">Loading…</div>;
  if (status === "error") return <div className="p-16 text-center text-red-600">{error}</div>;
  if (!data) return null;

  return (
    <article className="container-xl py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl tracking-tight">{data.name}</h1>
        <div className="flex items-center gap-3">
          <button onClick={onToggle} className="btn" aria-label="Toggle favorite">
            {fav ? "★ Remove favorite" : "☆ Add to favorites"}
          </button>
          <Link to="/dashboard" className="link-und">Back</Link>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-neutral-200 mask-soft">
        {data.image ? (
          <img src={data.image} alt={data.name} className="w-full h-[360px] object-cover"
            onError={(e) => { e.currentTarget.style.display = "none" }} />
        ) : (
          <div className="h-[360px] bg-neutral-100"></div>
        )}
      </div>

      <p className="mt-6 text-neutral-700">{data.description}</p>

      <section className="mt-8">
        <div className="glass p-6">
          <h2 className="text-xl">Ingredients</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {data.ingredients.map((it, i) => (
              <li key={i} className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-3">
                {it.img ? (
                  <img src={it.img} alt={it.label} className="h-10 w-10 rounded-lg object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none" }} />
                ) : <div className="h-10 w-10 rounded-lg bg-neutral-100"></div>}
                <span className="text-neutral-800">{it.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
