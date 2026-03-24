// Server URL: https://assignment2-zpof.onrender.com

const http = require("http");
const fs   = require("fs");
const path = require("path");

// Fix for images not displaying, found online
// Not sure exactly how it works but it definitely works
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

    // db.json
    if (req.url === "/api") {
        fs.readFile(path.join(__dirname, "db.json"),
                   (err, content) => {
                       if(err) throw err;
                        res.writeHead(200, { "Content-Type": "application/json"});
                        res.end(data);
                   }
                );

    // Website
    } else if (req.url === "/" || req.url === "/index.html"){
        fs.readFile(path.join(__dirname, "index.html"),
                    (err, content) =>{
                        if(err) throw err;
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.end(html);
                    }
                    
    } else {
        // Fix for images not displaying, found online
        // Not sure exactly how it works but it definitely works
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

server.listen(5959, () => {
    console.log(`Server is running properly);
});
