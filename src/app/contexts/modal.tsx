"use client";

import { createContext, useState, ReactNode, useContext } from "react";

interface ModalContextType {
  openModals: { [key: string]: boolean };
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});

  const openModal = (modalName: string) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [modalName]: true,
    }));
  };

  const closeModal = (modalName: string) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [modalName]: false,
    }));
  };

  const closeAllModals = () => {
    setOpenModals((prevModals) =>
      Object.keys(prevModals).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    );
  };

  return (
    <ModalContext.Provider value={{ openModals, openModal, closeModal, closeAllModals }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
