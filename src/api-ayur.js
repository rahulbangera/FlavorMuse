const BASE = (import.meta.env.VITE_API_BASE_URL || "/ayur").replace(/\/+$/, "");

function norm(s) { return (s || "").trim().replace(/\s+/g, " "); }
function title(s) { return s.replace(/\S+/g, w => w[0]?.toUpperCase() + w.slice(1).toLowerCase()); }

export async function fetchAyurAll() {
  const url = `${BASE}/get/all`;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`get/all failed: ${res.status}`);
  const j = await res.json();
  const names = Array.isArray(j) ? j
    : Array.isArray(j?.recipesList) ? j.recipesList
    : [];
  const clean = Array.from(new Set(names.map(n => norm(String(n)))));
  return clean.sort((a, b) => a.localeCompare(b));
}

async function tryOnce(candidate) {
  const url = `${BASE}/get/${encodeURIComponent(candidate)}`;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) return null;
  const j = await res.json();
  const ingredients = Array.isArray(j.keyIngredients)
    ? j.keyIngredients.map(([img, label]) => ({ img, label }))
    : [];
  const primaryImg = j.foodImage || (ingredients[0]?.img || "");
  const desc = j.foodDescription || `${j.foodName || candidate} — description not available.`;
  return {
    name: j.foodName || candidate,
    image: primaryImg,
    description: desc,
    ingredients
  };
}

export async function fetchAyurRecipeNormalized(name) {
  const raw = norm(name);
  const variants = Array.from(new Set([
    raw,
    raw.toLowerCase(),
    title(raw),
    raw.toLowerCase().replace(/\s+/g, "-"),
    raw.toLowerCase().replace(/\s+/g, "_")
  ])).filter(Boolean);
  for (const v of variants) {
    const hit = await tryOnce(v);
    if (hit) return hit;
  }
  throw new Error(`Not found: ${raw}`);
}
