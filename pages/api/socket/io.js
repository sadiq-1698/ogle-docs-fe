import { Server as ServerIO } from "socket.io";
import connectToDatabase from "@/lib/db-connect";
import documentModel from "../../../models/document";

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
      socket.on("save-changes", async (saveChanges) => {
        await connectToDatabase();

        try {
          await documentModel.findByIdAndUpdate(saveChanges.docId, {
            ...saveChanges.changes,
          });
          socket.emit("saved-changes", {
            ...saveChanges.changes,
          });
        } catch (error) {
          socket.emit("saved-changes", 0);
        }
      });

      socket.on("join-doc", (roomId) => {
        socket.join(roomId);

        socket.on("input-change", (doc) => {
          socket.to(roomId).emit("output-change", doc);
        });
      });
    });
  }

  res.end();
};

export default ioHandler;
