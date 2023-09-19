import { Server as ServerIO } from "socket.io";
import userModel from "../../../models/user";
import documentModel from "../../../models/document";
import connectToDatabase from "@/lib/db-connect";

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
      socket.on("input-change", (inputChanges) => {
        const room = inputChanges.docId;
        if (!room) return;

        socket.emit("output-change", inputChanges);
      });

      socket.on("save-changes", async (saveChanges) => {
        await connectToDatabase();

        try {
          await documentModel.findByIdAndUpdate(saveChanges.docId, {
            content: saveChanges.content,
          });
          socket.emit("saved-changes", "true");
        } catch (error) {
          socket.emit("saved-changes", "false");
        }
      });
    });
  }

  res.end();
};

export default ioHandler;
