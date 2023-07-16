import React, { createContext, useContext, useState } from "react";

const OffcanvasContext = createContext();
export const useOffCanvas = () => {
  return useContext(OffcanvasContext);
};
export function OffcanvasContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOffcanvas = () => {
    setIsOpen((prev) => !prev);
  };
  const closeOffcanvas = () => {
    setIsOpen(false);
  };
  return (
    <OffcanvasContext.Provider value={{ toggleOffcanvas, closeOffcanvas, isOpen, setIsOpen }}>
      {children}
    </OffcanvasContext.Provider>
  );
}
