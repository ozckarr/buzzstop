const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (message) => {
    socket.broadcast.emit("receive-message", message);
  });
});

server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
