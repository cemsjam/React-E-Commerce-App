import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { useOffcanvasStore } from "@/stores/offcanvasStore";
import { useCartStore } from "@/stores/cartStore";

import SearchBar from "@/layout/Header/SearchBar";
import Offcanvas from "@/components/Offcanvas/Offcanvas";
import MainNavigation from "./MainNavigation";
import MobileMenu from "./MobileMenu";
import VisualOnlySvg from "@/components/VisualOnlySvg";
import Button from "@/components/Button";

function Navbar() {
  const isOpen = useOffcanvasStore((state) => state.isOpen);
  const toggleOffcanvas = useOffcanvasStore((state) => state.toggleOffcanvas);
  const cartItems = useCartStore((state) => state.cartItems);

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
    <>
      <header className=" bg-white">
        <nav className="container py-1 md-py-0 md:h-[50px] flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
          <MobileMenu />
          <Link to="/">Logo</Link>
          <SearchBar />
          <Button
            variant="icon"
            className="relative w-8 h-8"
            onClick={toggleOffcanvas}
            aria-label="Toggle Shopping Cart"
          >
            <VisualOnlySvg>
              <AiOutlineShoppingCart size={20} />
            </VisualOnlySvg>
            {cartItems?.length > 0 && (
              <span className="badge absolute top-0 right-0 w-4 h-4 inline-flex justify-center items-center rounded-full bg-primary text-white text-sm font-semibold transition-all">
                {cartItems?.length}
              </span>
            )}
          </Button>
        </nav>
      </header>
      <MainNavigation />
      {isOpen && <div ref={overlayRef} className="overlay fixed inset-0 z-[100] bg-white/70 backdrop-blur-sm"></div>}
      <Offcanvas ref={offcanvasRef} isOpen={isOpen} onClick={toggleOffcanvas} />
    </>
  );
}

export default Navbar;
