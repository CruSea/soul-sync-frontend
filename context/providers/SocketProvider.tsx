"use client"; // Ensures this file runs only on the client side

import { userToken } from "@/actions/auth/login";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    let newSocket: Socket | null = null; // Scoped variable for cleanup

    const setupSocket = async () => {
    
      console.log('url',process.env.NEXT_PUBLIC_API_SOCKET_URL)
      const URL=process.env.NEXT_PUBLIC_API_SOCKET_URL
      try {
        const token = await userToken();
        newSocket = io(URL, {
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
