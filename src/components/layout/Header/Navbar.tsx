import { useEffect } from "react";

import { useOffcanvasStore } from "@/stores/offcanvasStore";

import SearchBar from "@/components/layout/Header/SearchBar";
import Offcanvas from "@/components/Offcanvas/Offcanvas";
import MainNavigation from "./MainNavigation";
import MobileMenu from "./MobileMenu";

import Logo from "../Logo";
import NavbarActions from "./NavbarActions";
import useMediaQuery from "@/hooks/useMediaQuery";

function Navbar() {
	const isOpen = useOffcanvasStore((state) => state.isOpen);
	const toggleOffcanvas = useOffcanvasStore((state) => state.toggleOffcanvas);
	const isMobile = useMediaQuery("(max-width:992px)");

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

	return (
		<div>
			<header className=" bg-white">
				<nav className="container py-3 md:py-1 md:h-[70px] flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
					<MobileMenu />
					<Logo className="hidden lg:block" />
					<SearchBar />
					<NavbarActions />
				</nav>
			</header>
			{!isMobile && <MainNavigation />}
			{isOpen && (
				<div onClick={toggleOffcanvas} className="overlay fixed inset-0 z-[100] bg-white/70 backdrop-blur-sm" />
			)}
			<Offcanvas isOpen={isOpen} onClick={toggleOffcanvas} />
		</div>
	);
}

export default Navbar;
