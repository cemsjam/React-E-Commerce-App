import Navbar from "./Header/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import ScrollUp from "@/layout/ScrollUp";
import Drawer from "@/components/Drawers/Drawer";
import Footer from "./Footer";

function MainLayout() {
	return (
		<>
			<div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
				<Navbar />
				<main className="container py-4 flex-1">
					<Outlet />
				</main>
				<Footer />
			</div>
			<ScrollUp />
			<Drawer />
			<Toaster />
		</>
	);
}

export default MainLayout;
