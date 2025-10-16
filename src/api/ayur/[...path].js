// api/ayur/[...path].js
const UPSTREAM = "https://ayur-analytics-6mthurpbxq-el.a.run.app";

const ALLOW_ORIGIN = "*"; // or set to "https://flavor-muse.vercel.app" for strict mode
const ALLOW_METHODS = "GET,OPTIONS";
const ALLOW_HEADERS = "Accept, Content-Type, Authorization";
const MAX_AGE = "86400";

function setCors(res, originHeader) {
  // For strict reflection mode, use: const origin = originHeader || "";
  // And validate against a whitelist before echoing.
  res.setHeader("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", ALLOW_METHODS);
  res.setHeader("Access-Control-Allow-Headers", ALLOW_HEADERS);
  res.setHeader("Access-Control-Max-Age", MAX_AGE);
  // If you switch to reflecting the request origin, also include:
  // res.setHeader("Vary", "Origin");
}

export default async function handler(req, res) {
  // Handle preflight
  if (req.method === "OPTIONS") {
    setCors(res, req.headers.origin);
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    setCors(res, req.headers.origin);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const segs = Array.isArray(req.query.path) ? req.query.path : [req.query.path].filter(Boolean);
    const tail = segs.join("/"); // e.g., "get/all" or "get/masala%20dosa"
    if (!tail) {
      setCors(res, req.headers.origin);
      return res.status(400).json({ error: "Missing path" });
    }

    const upstream = `${UPSTREAM}/${tail}`;
    const r = await fetch(upstream, { headers: { accept: "application/json" } });
    const txt = await r.text();

    // Pass through JSON content-type when available
    const type = r.headers.get("content-type") || "application/json";
    res.setHeader("Content-Type", type);
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");

    // Enable CORS for browser clients
    setCors(res, req.headers.origin);

    return res.status(r.status).send(txt);
  } catch (e) {
    setCors(res, req.headers.origin);
    return res.status(502).json({ error: "Proxy error", detail: String(e?.message || e) });
  }
}
