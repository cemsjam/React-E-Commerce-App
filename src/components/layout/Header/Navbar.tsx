import React, { useEffect, useRef } from "react";

import { useOffcanvasStore } from "@/stores/offcanvasStore";

import SearchBar from "@/components/layout/Header/SearchBar";
import Offcanvas from "@/components/Offcanvas/Offcanvas";
import MainNavigation from "./MainNavigation";
import MobileMenu from "./MobileMenu";

import Logo from "../Logo";
import NavbarActions from "./NavbarActions";

function Navbar() {
	const isOpen = useOffcanvasStore((state) => state.isOpen);
	const toggleOffcanvas = useOffcanvasStore((state) => state.toggleOffcanvas);

	//#region layout shift
	useEffect(() => {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		if (isOpen) {
			document.documentElement.style.overflow = "hidden";
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		} else {
			document.documentElement.style.overflow = "";
			document.body.style.paddingRight = "";
		}
	}, [isOpen]);
	//#endregion

	const offcanvasRef = useRef<HTMLElement>();
	const overlayRef = useRef<HTMLDivElement | null>(null);
	// console.log("offcanvasRef declared here first");
	return (
		<div>
			<header className=" bg-white">
				<nav className="container py-1 md-py-0 md:h-[50px] flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
					<MobileMenu />
					<Logo />
					<SearchBar />
					<NavbarActions />
				</nav>
			</header>
			<MainNavigation />
			{isOpen && (
				<div
					ref={overlayRef}
					className="overlay fixed inset-0 z-[100] bg-white/70 backdrop-blur-sm"
				></div>
			)}
			<Offcanvas ref={offcanvasRef} isOpen={isOpen} onClick={toggleOffcanvas} />
		</div>
	);
}

export default Navbar;
