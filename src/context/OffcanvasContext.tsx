import React, { createContext, useContext, useState } from "react";

type OffCanvasState = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	toggleOffcanvas: () => void;
	closeOffcanvas: () => void;
};

const OffcanvasContext = createContext<OffCanvasState | undefined>(undefined);

export const useOffCanvas = () => {
	const context = useContext(OffcanvasContext);
	if (!context) {
		throw new Error("useOffCanvas must be within an OffcanvasContextProvider");
	}
	return context;
};
export function OffcanvasContextProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOffcanvas = () => {
		setIsOpen((prev) => !prev);
	};
	const closeOffcanvas = () => {
		setIsOpen(false);
	};
	const contextValue: OffCanvasState = { toggleOffcanvas, closeOffcanvas, isOpen, setIsOpen };
	return (
		<OffcanvasContext.Provider value={contextValue}>{children}</OffcanvasContext.Provider>
	);
}
