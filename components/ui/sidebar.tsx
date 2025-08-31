'use client';

import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ 
  children,
  defaultOpen = true 
}: { 
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  const context = useContext(SidebarContext);
  
  return (
    <div className={`flex flex-1 flex-col ${context?.isOpen ? 'ml-60' : 'ml-16'}`}>
      {children}
    </div>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}