'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface DataStreamContextType {
  isConnected: boolean;
  messages: any[];
  sendMessage: (message: any) => void;
}

const DataStreamContext = createContext<DataStreamContextType | undefined>(undefined);

export function DataStreamProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = (message: any) => {
    // Implementation for sending messages through WebSocket
    console.log('Sending message:', message);
  };

  useEffect(() => {
    // WebSocket connection logic would go here
    setIsConnected(true);
    
    return () => {
      // Cleanup connection
      setIsConnected(false);
    };
  }, []);

  return (
    <DataStreamContext.Provider value={{ isConnected, messages, sendMessage }}>
      {children}
    </DataStreamContext.Provider>
  );
}

export function useDataStream() {
  const context = useContext(DataStreamContext);
  if (context === undefined) {
    throw new Error('useDataStream must be used within a DataStreamProvider');
  }
  return context;
}