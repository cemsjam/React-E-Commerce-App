import { Link, type RouteObject } from "react-router-dom";

import App from "@/App";

import Home from "@/pages/Home";
import Category from "@/pages/Category";
import ProductPage from "@/pages/ProductPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import AccountPage from "@/pages/Account";
import WishlistPage from "@/pages/WishlistPage";
import SearchPage from "@/pages/SearchPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/sign-in",
				element: <SignInPage />,
			},
			{
				path: "/sign-up",
				element: <SignUpPage />,
			},
			{
				path: "/category/:categoryId",
				element: <Category />,
			},
			{
				path: "/product/:productId",
				element: <ProductPage />,
			},
			{
				path: "/account",
				element: <AccountPage />,
			},
			{
				path: "/wishlist",
				element: <WishlistPage />,
			},
			{
				path: "/search",
				element: <SearchPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
