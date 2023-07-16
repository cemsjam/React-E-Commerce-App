import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "@/context/ShoppingCartContext";
import { useOffCanvas } from "@/context/OffcanvasContext";

import SearchBar from "@/layout/Header/SearchBar";
import Offcanvas from "@/components/Offcanvas/Offcanvas";
import MainNavigation from "./MainNavigation";
import MobileMenu from "./MobileMenu";
import VisualOnlySvg from "@/components/VisualOnlySvg";
import Button from "@/components/Button";

function Navbar() {
  const { state } = useCart();
  const { isOpen, toggleOffcanvas, closeOffcanvas } = useOffCanvas();
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
  const overlayRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (e.target.contains(overlayRef.current)) {
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
            {state.cartItems.length > 0 && (
              <span className="badge absolute top-0 right-0 w-4 h-4 inline-flex justify-center items-center rounded-full bg-indigo-700 text-white text-sm font-semibold transition-all">
                {state.cartItems.length}
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
