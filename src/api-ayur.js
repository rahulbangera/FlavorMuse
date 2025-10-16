const BASE = (import.meta.env.VITE_API_BASE_URL || "/ayur").replace(/\/+$/, "");
const DEFAULT_HEADERS = { accept: "application/json" };
const TIMEOUT_MS = 12000;

function norm(s) { return (s || "").trim().replace(/\s+/g, " "); }
function title(s) { return s.replace(/\S+/g, w => w[0]?.toUpperCase() + w.slice(1).toLowerCase()); }

async function fetchText(url, options = {}) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...options,
      headers: { ...DEFAULT_HEADERS, ...(options.headers || {}) },
      signal: ctrl.signal,
    });
    const ctype = res.headers.get("content-type") || "";
    const body = await res.text();

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
    }
    if (!/application\/json/i.test(ctype)) {
      throw new Error(`Non-JSON response at ${url}: ${body.slice(0, 200)}`);
    }
    return body;
  } finally {
    clearTimeout(id);
  }
}

async function fetchJSON(url, options) {
  const txt = await fetchText(url, options);
  try {
    return JSON.parse(txt);
  } catch (e) {
    throw new Error(`Bad JSON at ${url}: ${String(e?.message || e)}`);
  }
}

function adaptRecipe(j, candidateName) {
  const ingredients = Array.isArray(j.keyIngredients)
    ? j.keyIngredients.map(([img, label]) => ({ img, label }))
    : [];
  const name = j.foodName || candidateName;
  const image = j.foodImage || (ingredients[0]?.img || "");
  const description = j.foodDescription || `${name} — description not available.`;
  return { name, image, description, ingredients };
}

export async function fetchAyurAll() {
  const url = `${BASE}/get/all`;
  const j = await fetchJSON(url);

  const names = Array.isArray(j) ? j
    : Array.isArray(j?.recipesList) ? j.recipesList
      : [];

  const clean = Array.from(new Set(names.map(n => norm(String(n)))));
  return clean.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

async function tryOnce(candidate) {
  const url = `${BASE}/get/${encodeURIComponent(candidate)}`;
  try {
    const j = await fetchJSON(url);
    return adaptRecipe(j, candidate);
  } catch {
    return null;
  }
}

export async function fetchAyurRecipeNormalized(name) {
  const raw = norm(name);
  const variants = Array.from(new Set([
    raw,
    raw.toLowerCase(),
    title(raw),
    raw.toLowerCase().replace(/\s+/g, "-"),
    raw.toLowerCase().replace(/\s+/g, "_"),
  ])).filter(Boolean);

  for (const v of variants) {
    const hit = await tryOnce(v);
    if (hit) return hit;
  }
  throw new Error(`Not found: ${raw}`);
}

export async function fetchAyurRecipeCore(name) {
  const hit = await tryOnce(norm(name));
  if (hit) return hit;
  throw new Error(`Not found: ${name}`);
}
