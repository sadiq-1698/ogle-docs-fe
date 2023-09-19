"use client";

import { io as ClientIO } from "socket.io-client";
import { useState, useEffect, useContext, createContext } from "react";

const SocketContext = createContext({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [documentValue, setDocumentValue] = useState("");

  useEffect(() => {
    // TODO : change the path before deploying
    const socketInstance = new ClientIO(process.env.NEXT_PUBLIC_SITE_URL, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected!");
      setIsConnected(true);
    });

    socketInstance.on("output-change", (inputChanges) => {
      console.log("At client side", inputChanges);
    });

    socketInstance.on("saved-changes", (status) => {
      console.log("At client side status", status);
      setIsSaving(false);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isSaving,
        setIsSaving,
        isConnected,
        documentValue,
        setDocumentValue,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
