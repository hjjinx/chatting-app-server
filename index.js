const express = require("express");
const app = express();
var server = require("http").createServer(app);

const io = require("socket.io")(server);
// Register Socket Connection Listener:
require("./socket")(io);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

server.listen(8080, "localhost", () => {
  console.log("Listening on Port 8080");
});

module.exports.io = io;
