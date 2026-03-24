// Server URL: https://assignment2-zpof.onrender.com

const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const mimeTypes = {
    ".html": "text/html",
    ".css":  "text/css",
    ".js":   "text/javascript",
    ".json": "application/json",
    ".png":  "image/png",
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif":  "image/gif",
    ".svg":  "image/svg+xml",
    ".ico":  "image/x-icon"
};

const server = http.createServer((req, res) => {

    // ── Route: /api — serve db.json as JSON ──
    if (req.url === "/api") {
        const data = fs.readFileSync(path.join(__dirname, "db.json"), "utf8");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);

    // ── Route: / — serve the organization website ──
    } else if (req.url === "/" || req.url === "/index.html") {
        const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);

    // ── Static files (images, etc.) ──
    } else {
        const filePath = path.join(__dirname, req.url);
        const ext = path.extname(filePath);
        const contentType = mimeTypes[ext] || "application/octet-stream";

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 - File Not Found");
            } else {
                res.writeHead(200, { "Content-Type": contentType });
                res.end(data);
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
