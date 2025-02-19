"use client"; // Only this file runs on the client side

import { apiUrl, userToken } from "@/actions/auth/login";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const setupSocket = async () => {
      try {
        const token = await userToken();
        const baseUrl = await apiUrl();

        const newSocket = io("https://1clr2kph-3002.uks1.devtunnels.ms", {
          query: { token },
        });

        newSocket.on("message", (message) => {
          try {
            const data = typeof message === "object" ? message : JSON.parse(message);
            if (data) {
              console.log("Received message:", data);
            } else {
              console.log("Received message with unexpected format:", data);
            }
          } catch (error) {
            console.error("Failed to parse message:", error);
          }
          rl.prompt();
        });

        setSocket(newSocket);
      } catch (error) {
        console.error("Error setting up socket:", error);
      }
    };

    setupSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
