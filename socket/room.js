const { getPersonIconColor } = require("../commonMethods");

module.exports = (socket, io) => {
  socket.on("room/join", (data) => {
    const room = require("../rooms").find((x) => x.name == data.room.name);
    if (!room) {
      socket.emit("error/roomDoesntExist");
      return;
    }
    room.participants.push({
      id: socket.id,
      name: data.name,
      status: { socketState: 1 },
      color: getPersonIconColor(data.name),
    });
    socket.emit("room/joined", { room });
    io.to(data.room.name).emit("room/participantsUpdate", room.participants);
    socket.join(data.room.name);
  });
  socket.on("room/create", (data) => {
    const rooms = require("../rooms");
    if (rooms.find((x) => x.name == data.roomName)) {
      socket.emit("error/roomAlreadyExists");
      return;
    }
    const room = {
      name: data.roomName,
      participants: [
        {
          id: socket.id,
          name: data.name,
          status: { socketState: 1 },
          color: getPersonIconColor(data.name),
        },
      ],
      messages: [],
    };
    rooms.push(room);
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
  socket.on("disconnecting", () => {
    const rooms = require("../rooms");
    for (let index in rooms) {
      const room = rooms[index];
      const i = room.participants.findIndex((x) => x.id == socket.id);
      if (i != -1) {
        room.participants.splice(i, 1);
        if (room.participants.length == 0) {
          // when everyone left the room
          rooms.splice(index, 1);
          return;
        }
        io.to(room.name).emit("room/participantsUpdate", room.participants);
      }
    }
  });
};
