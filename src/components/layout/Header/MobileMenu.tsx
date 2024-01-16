import { drawerActions } from "@/redux/drawerSlice/actions";
import { RxHamburgerMenu } from "react-icons/rx";

function MobileMenu() {
	// const openDrawer = useDrawerStore((state) => state.openDrawer);
	const handleClick = () => {
		drawerActions.openDrawer({
			name: "main-navigation",
			data: { something: "test data" },
		});
	};
	return (
		<button type="button" className="md:hidden" onClick={handleClick}>
			<RxHamburgerMenu size={20} /> <span className="sr-only">Open Menu</span>
		</button>
	);
}

export default MobileMenu;
