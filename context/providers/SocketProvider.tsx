'use client'; 

import { apiUrl, userToken } from '@/actions/auth/login';
import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    let newSocket: Socket | null = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const reconnectDelay = 2000;

    const setupSocket = async () => {
      const URL = process.env.NEXT_PUBLIC_API_SOCKET_URL;
      try {
        const token = await userToken();
        
        if (newSocket) {
          newSocket.disconnect();
        }

        newSocket = io(URL, {
          query: { token },
          transports: ['websocket'],
          reconnection: true,
          reconnectionAttempts: maxReconnectAttempts,
          reconnectionDelay: reconnectDelay,
          autoConnect: true,
        });

        newSocket.on('connect', () => {
          console.log('Socket connected');
          reconnectAttempts = 0;
        });

        newSocket.on('disconnect', (reason) => {
          console.log('Socket disconnected:', reason);
          if (reason === 'io server disconnect') {
            setTimeout(() => {
              newSocket?.connect();
            }, reconnectDelay);
          }
        });

        newSocket.on('reconnect_attempt', (attempt) => {
          console.log(`Reconnection attempt ${attempt}`);
          reconnectAttempts = attempt;
        });

        newSocket.on('reconnect_failed', () => {
          console.log('Reconnection failed');
        });

        newSocket.on('message', (message) => {
          try {
            const data = typeof message === 'object' ? message : message;
          } catch (error) {
            console.error('Error processing message:', error);
          }
        });

        setSocket(newSocket);
      } catch (error) {
        console.error('Socket connection error:', error);
      }
    };

    setupSocket();

    return () => {
      if (newSocket) {
        newSocket.off('connect');
        newSocket.off('disconnect');
        newSocket.off('reconnect_attempt');
        newSocket.off('reconnect_failed');
        newSocket.off('message');
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}