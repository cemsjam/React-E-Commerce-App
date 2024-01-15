import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type PayloadValues = {
	name: string;
	data?: unknown;
};

export type IDrawerState = {
	drawer: PayloadValues[] | any[];
};
const initialState: IDrawerState = {
	drawer: [],
};

export const drawerSlice = createSlice({
	name: "drawer",
	initialState,
	reducers: {
		_openDrawer: (state, action: PayloadAction<PayloadValues>) => {
			console.log("payload", action.payload);
			state.drawer = [...state.drawer, action.payload];
		},
		_closeDrawer: (state) => {
			state.drawer = [];
		},
	},
});

export const { _openDrawer, _closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
