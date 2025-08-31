// socket.js
let io;

function initSocket(server) {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // React app
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`⚡ User connected: ${socket.id}`);

     socket.on("joinRole", (role) => {
      socket.join(role); // join role-based room
      console.log(`👤 ${socket.id} joined role: ${role}`);
    });

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error("❌ Socket.io not initialized!");
  }
  return io;
}

module.exports = { initSocket, getIO };
