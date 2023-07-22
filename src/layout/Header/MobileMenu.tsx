import { RxHamburgerMenu } from "react-icons/rx";
function MobileMenu() {
  return (
    <button type="button" className="md:hidden">
      <RxHamburgerMenu size={20} /> <span className="sr-only">Open Menu</span>
    </button>
  );
}

export default MobileMenu;
