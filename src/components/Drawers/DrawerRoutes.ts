import MainNavigationDrawer from "./MainNavigationDrawer";

interface IDrawerRoutes {
  name: string;
  element: React.FunctionComponent;
}

export const DrawerRoutes: IDrawerRoutes[] = [
  {
    name: "main-navigation",
    element: MainNavigationDrawer,
  },
];
