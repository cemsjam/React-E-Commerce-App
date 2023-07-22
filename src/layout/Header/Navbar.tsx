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
  const { isOpen, toggleOffcanvas, closeOffcanvas } = useOffcanvasStore();
  const { cartItems } = useCartStore();
  const headerRef = useRef(null);

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

  //#region click overlay to close cart
  const overlayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (overlayRef.current && target instanceof Node && target?.contains(overlayRef.current)) {
        closeOffcanvas();
      }
    };
    document.addEventListener("click", handler);
    return () => removeEventListener("click", handler);
  }, []);

  //#endregion

  return (
    <>
      <header ref={headerRef} className=" bg-white">
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
              <span className="badge absolute top-0 right-0 w-4 h-4 inline-flex justify-center items-center rounded-full bg-indigo-700 text-white text-sm font-semibold transition-all">
                {cartItems?.length}
              </span>
            )}
          </Button>
        </nav>
      </header>
      <MainNavigation />
      {isOpen && <div ref={overlayRef} className="overlay fixed inset-0 z-[100] bg-white/70 backdrop-blur-sm"></div>}
      <Offcanvas isOpen={isOpen} onClick={toggleOffcanvas} />
    </>
  );
}

export default Navbar;
