import http from "node:http";
import fs from "fs/promises";
import { createWriteStream, readdirSync, readFileSync } from "node:fs";
import mime from "mime-types";
const server = http.createServer();

function ServeHtml(res, req) {
  const urlPath = decodeURIComponent(req.url);
  const [url, queryString] = urlPath.split("?");
  const content = readdirSync("./Storage" + url);
  res.end(JSON.stringify(content));
}

server.on("request", async (req, res) => {
  console.log(req.method, req.url);

  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "GET") {
    const urlPath = decodeURIComponent(req.url);
    const [url, queryString] = urlPath.split("?");

    if (
      req.url === "/favicon.ico" ||
      req.url === "/.well-known/appspecific/com.chrome.devtools.json"
    )
      return res.end();
    else if (req.url == "/") {
      ServeHtml(res, req);
    } else {
      try {
        console.log(url, req.url);
        const fileHandle = await fs.open(`Storage${url}`);
        const filestat = await fileHandle.stat();
        if (filestat.isDirectory()) {
          ServeHtml(res, req);
        } else {
          const [action, value] = queryString.split("=");
          const pathString = url.split("/");
          const fileName = pathString[pathString.length - 1];
          const mimeType = mime
            .contentType(fileName)
            .replace("application/mp4", "video/mp4");
          res.setHeader("Content-Type", mimeType);
          res.setHeader("Content-Length", filestat.size);
          if (value === "download") {
            console.log("downloading.........");
            res.setHeader(
              "Content-Disposition",
              `attachment;filename=${fileName}`
            );
          }
          const readStream = fileHandle.createReadStream();
          readStream.pipe(res);

          readStream.on("end", () => {
            fileHandle.close();
          });
        }
      } catch (error) {
        console.log(error);
        res.end("Error Occur");
      }
    }
  }
  if (req.method === "OPTIONS") {
    // Preflight check — tell browser it’s allowed
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method === "POST") {
    console.log("posting..");
    const filename = req.headers["filename"];
    const writeStream = createWriteStream(`../Backend/Storage/${filename}`);
    req.pipe(writeStream);
    res.end("Data Received");
  }
  if (req.method === "DELETE") {
    const filename = req.headers["filename"];
    console.log(filename)
    await fs.unlink(`../Backend/Storage/${filename}`);
    ServeHtml(res,req)
  }
  if(req.method==='PUT'){
    const oldname=req.headers['oldname']
    const newname=req.headers['newname']
    console.log(oldname,newname)
    await fs.rename(`../Backend/Storage/${oldname}`,`../Backend/Storage/${newname}`)
    ServeHtml(res,req)
  }
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Server is running on ", server.address());
});
