import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchAllRecipes } from "../api";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";

  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        const data = await fetchAllRecipes();
        const names = Array.isArray(data) ? data : Array.isArray(data?.recipesList) ? data.recipesList : [];
        setRecipes(names);
        setStatus("done");
      } catch (e) {
        setError(e.message || "Failed to load recipes");
        setStatus("error");
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!q) return recipes;
    const term = q.toLowerCase();
    return recipes.filter((n) => n.toLowerCase().includes(term));
  }, [recipes, q]);

  function onSearch(e) {
    const v = e.target.value;
    if (v) setParams({ q: v }); else setParams({});
  }

  if (status === "loading") return <div className="p-16 text-center">Loading…</div>;
  if (status === "error") return <div className="p-16 text-center text-red-600">{error}</div>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <input className="field" placeholder="Search recipes…" value={q} onChange={onSearch} aria-label="Search recipes" />
      </div>
      <div className="grid-cards">
        {filtered.map((name) => (
          <Link key={name} to={`/recipe/${encodeURIComponent(name)}`} className="card p-6 block">
            <div className="text-sm text-neutral-500">Recipe</div>
            <h3 className="mt-2 text-xl">{name}</h3>
            <p className="mt-2 text-neutral-600">View details</p>
          </Link>
        ))}
      </div>
      {!filtered.length && <div className="p-16 text-center text-neutral-600">No matching recipes</div>}
    </section>
  );
}
