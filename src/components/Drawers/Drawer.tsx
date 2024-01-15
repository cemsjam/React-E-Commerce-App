import { motion } from "framer-motion";
import { GrFormClose } from "react-icons/gr";
import { DrawerRoutes } from "./DrawerRoutes";
import { getDrawer, drawerActions } from "@/redux/drawerSlice/actions";
const Drawer = () => {
	const drawerStore = getDrawer();
	if (drawerStore.drawer.length <= 0) return null;
	return (
		<motion.div
			transition={{
				ease: "ease",
				duration: 0.2,
			}}
			key={drawerStore.drawer[0].name}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-slate-200/70 backdrop-blur-sm z-[88] transition"
		>
			<motion.div
				transition={{
					ease: "easeOut",
					duration: 0.2,
				}}
				key={drawerStore.drawer[0].name}
				initial={{ translateX: "-100%" }}
				animate={{ translateX: 0 }}
				exit={{ translateX: "-100%", opacity: 0 }}
				className="fixed left-0 top-0 h-screen w-[250px] bg-white z-[88] transition"
			>
				{/* header */}
				<div>
					<button
						className="p-4 flex items-center justify-between w-full font-bold text-sm hover:bg-slate-50"
						type="submit"
						aria-label="Close Main Navigation Bar"
						onClick={() => drawerActions.closeDrawer()}
					>
						Close
						<GrFormClose />
					</button>
				</div>
				{/* content */}
				{drawerStore.drawer.map((item) => {
					const current = DrawerRoutes.find((route) => item.name === route.name);
					if (!current) return null;
					return <current.element key={item.name} data={item.data ? item.data : null} />;
				})}
			</motion.div>
		</motion.div>
	);
};

export default Drawer;
