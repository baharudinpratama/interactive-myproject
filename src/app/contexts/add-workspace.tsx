"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AddWorkspaceContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AddWorkspaceContext = createContext<AddWorkspaceContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode; }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <AddWorkspaceContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </AddWorkspaceContext.Provider>
  );
};

export const useAddWorkspaceContext = (): AddWorkspaceContextProps => {
  const context = useContext(AddWorkspaceContext);
  if (!context) {
    throw new Error("useAddWorkspaceContext must be used within a SidebarProvider");
  }
  return context;
};
