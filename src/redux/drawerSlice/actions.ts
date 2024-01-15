import { store } from "../store";
import { useSelector } from "react-redux";
import { _openDrawer, _closeDrawer, type PayloadValues } from ".";
import { RootState } from "../store";

export const getDrawer = () => {
	const drawer = useSelector((state: RootState) => state.drawer);
	return drawer;
};

export const drawerActions = {
	openDrawer: ({ name, data }: PayloadValues) => {
		store.dispatch(_openDrawer({ name, data }));
	},
	closeDrawer: () => store.dispatch(_closeDrawer()),
};
