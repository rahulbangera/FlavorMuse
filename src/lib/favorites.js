const KEY = "favorites";
const EVT = "favorites:changed";

export function getFavorites() {
  try { const a = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(a) ? a : []; }
  catch { return []; }
}

export function setFavorites(list) {
  const seen = new Set(); const uniq = [];
  for (const it of list) {
    const n = String(it?.name || "").trim(); if (!n || seen.has(n)) continue;
    seen.add(n); uniq.push({ name: n, image: String(it?.image || "") });
  }
  localStorage.setItem(KEY, JSON.stringify(uniq));
  window.dispatchEvent(new CustomEvent(EVT));
}

export function isFavorite(name) {
  const n = String(name || "").trim();
  return getFavorites().some(f => f.name === n);
}

export function toggleFavorite(item) {
  const n = String(item?.name || "").trim(); if (!n) return getFavorites();
  const img = String(item?.image || "");
  const list = getFavorites();
  const i = list.findIndex(f => f.name === n);
  if (i >= 0) list.splice(i, 1); else list.push({ name: n, image: img });
  setFavorites(list);
  return list;
}

export function onFavoritesChange(cb) {
  const handler = () => cb(getFavorites());
  window.addEventListener(EVT, handler);
  window.addEventListener("storage", e => { if (e.key === KEY) handler(); });
  return () => window.removeEventListener(EVT, handler);
}
