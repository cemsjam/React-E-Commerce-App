import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./Header/Navbar";
import ScrollUp from "@/components/layout/ScrollUp";
import Footer from "./Footer";
import Modal from "../modals/Modal";

function MainLayout() {
	return (
		<>
			<div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
				<Navbar />
				<main className="flex-1 overflow-hidden">
					<Outlet />
				</main>
				<Footer />
			</div>
			<ScrollUp />
			<Toaster />
			<Modal />
		</>
	);
}

export default MainLayout;
