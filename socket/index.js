module.exports = (io) => {
  io.on("connection", (socket) => {
    // register room event listeners:
    require("./room")(socket, io);
  });
};
