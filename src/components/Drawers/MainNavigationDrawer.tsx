import MainNavigation from "@/components/layout/Header/MainNavigation";

const MainNavigationDrawer = ({ data }: any) => {
	console.log(data, "props");

	// console.log(data, "data");
	return <MainNavigation isDrawer />;
};

export default MainNavigationDrawer;
