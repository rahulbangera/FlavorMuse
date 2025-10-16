const UPSTREAM = "https://ayur-analytics-6mthurpbxq-el.a.run.app";

const ALLOW_ORIGIN = "*";
const ALLOW_METHODS = "GET,OPTIONS";
const ALLOW_HEADERS = "Accept, Content-Type, Authorization";
const MAX_AGE = "86400";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", ALLOW_METHODS);
  res.setHeader("Access-Control-Allow-Headers", ALLOW_HEADERS);
  res.setHeader("Access-Control-Max-Age", MAX_AGE);
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    setCors(res);
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    setCors(res);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const segs = Array.isArray(req.query.path) ? req.query.path : [req.query.path].filter(Boolean);
    if (!segs.length) {
      setCors(res);
      return res.status(400).json({ error: "Missing path" });
    }
    const encodedPath = segs.map(s => encodeURIComponent(String(s))).join("/");
    const qsIndex = req.url.indexOf("?");
    const qs = qsIndex >= 0 ? req.url.slice(qsIndex) : "";

    const upstream = `${UPSTREAM}/${encodedPath}${qs}`;
    const r = await fetch(upstream, { headers: { accept: "application/json" } });
    const txt = await r.text();

    res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
    setCors(res);

    return res.status(r.status).send(txt);
  } catch (e) {
    setCors(res);
    return res.status(502).json({ error: "Proxy error", detail: String(e?.message || e) });
  }
}
