import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/Sheet";
import MainNavigation from "./MainNavigation";
import { useLayoutEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

function MobileMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const isMobile = useMediaQuery("(max-width:992px)");
	useLayoutEffect(() => {
		if (!isMobile) {
			setIsOpen(false);
		}
	}, [isMobile]);
	return (
		<Sheet key={"mobile-main-nav"} open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<button type="button" className="lg:hidden">
					<Menu size={20} /> <span className="sr-only">Open Menu</span>
				</button>
			</SheetTrigger>
			<SheetContent side="left" className="bg-[#eeeeee] p-0 border-r-0 ">
				<div className="mt-10">
					<MainNavigation onClick={() => setIsOpen(false)} />
				</div>
			</SheetContent>
		</Sheet>
	);
}

export default MobileMenu;
