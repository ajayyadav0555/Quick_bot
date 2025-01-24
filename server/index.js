const { createServer } = require("http");
const { Server } = require("socket.io");

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const scores = [];

io.on("connection", (socket) => {
  console.log("Client connected", socket.id); // Log client socket ID

  socket.on("send", (data) => {
    // console.log(data);
    scores.push({ ...data, id: socket.id });
    console.log(scores);
    socket.emit("score", scores);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
