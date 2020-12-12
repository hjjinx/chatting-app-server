module.exports = (io) => {
  io.on("connection", (socket) => {
    // console.log("Client connected...");
    // console.log(socket);
    console.log("emitting socket event");
    socket.emit("socket", "connected to backend");
    socket.on("join", function (data) {
      console.log(data);
    });
  });
};
