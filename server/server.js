const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const http = require('http');
const { initSocket } = require("./socket");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);


// Track connected users
initSocket(server);

// MongoDB Connection
mongoose.connect("mongodb://admin:admin123@localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
