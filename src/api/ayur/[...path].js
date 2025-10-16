// api/ayur/[...path].js
const UPSTREAM = "https://ayur-analytics-6mthurpbxq-el.a.run.app";

export default async function handler(req, res) {
  // Optional CORS/preflight support
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Max-Age", "86400");
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const segs = Array.isArray(req.query.path) ? req.query.path : [req.query.path].filter(Boolean);
    const tail = segs.join("/"); // e.g., "get/all" or "get/masala%20dosa"
    if (!tail) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(400).json({ error: "Missing path" });
    }

    const upstream = `${UPSTREAM}/${tail}`;
    const r = await fetch(upstream, { headers: { accept: "application/json" } });
    const txt = await r.text();

    res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(r.status).send(txt);
  } catch (e) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(502).json({ error: "Proxy error", detail: String(e?.message || e) });
  }
}
