import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.listen(3001);

    io?.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        console.log("socket from server side with message -", msg);
        socket.broadcast?.emit("update-input", msg);
      });
    });
  }

  res.end();
};

export default ioHandler;
