//// connect to mongodb database
//
//const {MongoClient} = require("mongodb");
//
//async function findSomeData(client) {
//    const cursor = await client.db("bookdb").collection("bookcollection").find({book_id:33});
//
//    const results = await cursor.toArray();
//    console.log(results);
//
//    const js = JSON.stringify(results);
//    console.log(js);
//}
//
//
////-------------------------- MAIN --------------------------//
//async function main() {
//    
//    const uri = "mongodb+srv://jackson:jackson123@03162026.ils9tzf.mongodb.net/?appName=03162026";
//
//    const client = new MongoClient(uri);
//
//    try {
//        await client.connect();
//        console.log("MongoDB connection successful")
//
//        // Get the list of databases
//        await findSomeData(client);
//
//    } catch (e) {
//        console.log(e);
//    } finally {
//        await client.close();
//        console.log("Connection closed");
//    }
//}
//
//main();
//

// Server URL: (fill in after deploying to Render)

const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

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

    // ── 404 for anything else ──
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});