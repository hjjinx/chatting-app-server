const PORT = process.env.PORT || 3000;
var server = require("http").createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

server.listen(PORT, () => {
  console.log("Listening on Port " + PORT);
});

// Register Socket Connection Listener:
require("./socket/index")(io);

module.exports.io = io;
