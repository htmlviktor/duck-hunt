import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../settings';

export const socket = io(SOCKET_URL);
export const SocketContext = createContext(socket);

function SocketProvider({ children }) {
  const [socketConnect, setIsConnected] = useState(socket.connected);

  const socketProviderValue = useMemo(() => ({ socketConnect, socket }), [socketConnect, socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <SocketContext.Provider value={socketProviderValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
