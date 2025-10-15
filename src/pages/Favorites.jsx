import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites, toggleFavorite, onFavoritesChange } from "../lib/favorites";

export default function Favorites() {
  const [items, setItems] = useState(getFavorites());

  useEffect(() => {
    const off = onFavoritesChange(() => setItems(getFavorites()));
    setItems(getFavorites());
    return () => off?.();
  }, []);

  if (!items.length) return <div className="p-16 text-center text-neutral-600">No favorites yet</div>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Favorites ({items.length})</h1>
        <Link to="/dashboard" className="link-und">Back to dashboard</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <div key={f.name} className="card overflow-hidden">
            <Link to={`/recipe/${f.name}`} className="block">
              <div className="aspect-[16/9] bg-neutral-100 overflow-hidden">
                {f.image ? (
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : null}
              </div>
              <div className="p-5">
                <h3 className="text-lg">{f.name}</h3>
              </div>
            </Link>
            <div className="p-4 pt-0">
              <button
                className="btn w-full"
                onClick={() => { toggleFavorite({ name: f.name, image: f.image || "" }); setItems(getFavorites()); }}
                aria-label="Remove favorite"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
