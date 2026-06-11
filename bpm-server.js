import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";

const routes = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/styles.css", "styles.css"],
  ["/app.js", "app.js"],
  ["/README.md", "README.md"]
]);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

const server = createServer(async (req, res) => {
  setHeaders(res);

  if (req.method !== "GET" && req.method !== "HEAD") {
    return send(res, 405, "Method not allowed", "text/plain; charset=utf-8");
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const file = routes.get(url.pathname);

  if (!file) {
    return send(res, 404, "Not found", "text/plain; charset=utf-8");
  }

  try {
    const body = req.method === "HEAD" ? "" : await readFile(resolve(rootDir, file));
    return send(res, 200, body, mimeTypes[extname(file)] || "application/octet-stream");
  } catch (error) {
    console.error(error);
    return send(res, 500, "Unable to read application file", "text/plain; charset=utf-8");
  }
});

server.listen(port, host, () => {
  console.log(`BPM Agent Studio running at http://${host}:${port}`);
});

function setHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
}

function send(res, status, body, contentType) {
  res.writeHead(status, { "Content-Type": contentType });
  res.end(body);
}
