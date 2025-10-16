export default async function handler(req, res) {
  try {
    const segs = Array.isArray(req.query.path) ? req.query.path : [req.query.path].filter(Boolean);
    const tail = segs.join("/"); 
    if (!tail) return res.status(400).json({ error: "Missing path" });

    const upstream = `https://ayur-analytics-6mthurpbxq-el.a.run.app/${tail}`;
    const r = await fetch(upstream, { headers: { accept: "application/json" } });
    const txt = await r.text();

    res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(r.status).send(txt);
  } catch (e) {
    return res.status(502).json({ error: "Proxy error", detail: String(e?.message || e) });
  }
}
