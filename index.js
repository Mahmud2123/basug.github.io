const http = require("http");
const path = require("path");
const fs = require("fs");
const { stringify } = require("querystring");
const { extname } = require("path/posix");
const { isError } = require("util");

const server = http.createServer((req, res) => {
  let filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  // extension name
  let extname = path.extname(filepath);
  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  //readfile
  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // paage not foung
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
  //  if(req.url === "/"){
  //   fs.readFile(path.join(__dirname, 'public','index.html'),
  //     (err,content)=>{
  //     if(err) throw err;
  //      res.writeHead(200,{'Content-type':'text/html'});
  //   res.end(content);
  //   })

  //  }
  //  if(req.url === "/about"){
  //   fs.readFile(path.join(__dirname, 'public','about.html'),
  //     (err,content)=>{
  //     if(err) throw err;
  //      res.writeHead(200,{'Content-type':'text/html'});
  //   res.end(content);
  //   })

  //  }
  //  if(req.url === "/apis/users"){
  //   const users =[
  //      { name:"Hassan", age:20},
  //      { name:"Mahmud", age:23}
  //   ]
  //   res.writeHead(200,{'Content-type':'application/json'});
  //   res.end(JSON. stringify(users));
  //   }
});
const port = process.env.port || 8000;

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
