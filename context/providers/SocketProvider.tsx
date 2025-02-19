"use client"; // Ensures this file runs only on the client side

import { apiUrl, userToken } from "@/actions/auth/login";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    let newSocket: Socket | null = null; // Scoped variable for cleanup

    const setupSocket = async () => {
      try {
        const token =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyY2YxODY5OC00OWMxLTQ2MjctOTIxNi0yMTRkMDZiN2MwNDkiLCJlbWFpbCI6ImJubW1hcmtvc0BnbWFpbC5jb20iLCJpbWFnZVVybCI6bnVsbCwiYWNjb3VudHMiOlt7ImlkIjoiOTNjMjJlNzgtNGFlNC00ZWVjLWIyMGMtMjJlOWJmNTk1MjQ2IiwibmFtZSI6Ik15IEFjY291bnQiLCJyb2xlIjp7ImlkIjoiYjhkZTVlZTgtZjQ1ZC00ZDVjLTlmYWItYTFiZTBjNmZlNTlkIiwibmFtZSI6Ik1lbnRvciJ9fV0sImlhdCI6MTczOTk3MTI2NCwiZXhwIjozNjAxNzM5OTcxMjY0fQ.QVGnVA5QbU9R7nw3xFOGZTvFmEOSoCDDjDO7SsmYKV0`;
        https://1clr2kph-3002.uks1.devtunnels.ms?token=
        newSocket = io("https://1clr2kph-3002.uks1.devtunnels.ms", {
          query: { token },
          transports: ["websocket"], // Ensure WebSocket connection
          reconnection: true, // Enable reconnection attempts
          reconnectionAttempts: 5, // Max retries
          reconnectionDelay: 2000, // Delay between retries
        });

        newSocket.on("connect", () => console.log("Connected to WebSocket"));
        newSocket.on("disconnect", () => console.log("Disconnected from WebSocket"));
        newSocket.on("message", (message) => {
          console.log("Received message:", message);
          try {
            const data = typeof message === "object" ? message : message;
            console.log("Received message:", data);
          } catch (error) {
            console.error("Failed to parse message:", error);
          }
        });

        setSocket(newSocket);
      } catch (error) {
        console.error("Error setting up socket:", error);
      }
    };

    setupSocket();

    return () => {
      if (newSocket) {
        newSocket.off("message"); // Remove message listener
        newSocket.disconnect(); // Proper cleanup
      }
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
