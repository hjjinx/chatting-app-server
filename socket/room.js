module.exports = (socket, io) => {
  socket.on("room/join", (data) => {
    const room = require("../rooms").find((x) => x.name == data.name);
    if (!room) {
      socket.emit("error/roomDoesntExists");
      return;
    }
    room.participants.push({ name: data.name, status: { socketState: 1 } });
    socket.emit("room/joined", room);
  });
  socket.on("room/create", (data) => {
    if (io.sockets.adapter.rooms.has(data.roomName)) {
      socket.emit("error/roomAlreadyExists");
      return;
    }
    const room = {
      name: data.roomName,
      participants: [{ name: data.name, status: { socketState: 1 } }],
      messages: [],
    };
    require("../rooms").push(room);
    socket.join(data.roomName);
    socket.emit("room/joined", { room });
  });
  // emit the list of rooms every second to all the users currently connected
  socket.on("GET_room/list", () => {
    // rooms present in `io.sockets.adapter.rooms` is a map of sets.
    // converting that map of sets into a simple object and sending:
    // const object = {};
    // io.sockets.adapter.rooms.forEach((value, key) => {
    //   object[key] = Array.from(value);
    // });
    socket.emit("room/list", { rooms: require("../rooms") });
  });
};
