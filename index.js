var server = require("http").createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

server.listen(8080, () => {
  console.log("Listening on Port 8080");
});

// Register Socket Connection Listener:
require("./socket/index")(io);

module.exports.io = io;
