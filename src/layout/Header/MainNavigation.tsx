import React from "react";
import useFetch from "@/hooks/useFetch";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { CategoryType } from "@/types/CategoryType";

function MainNavigation({ isDrawer = false }) {
	const { data } = useFetch<CategoryType>(
		import.meta.env.VITE_APP_API_BASE_URL,
		"/categories"
	);
	return (
		<div
			className={classNames("bg-white", {
				"hidden md:block border-b border-b-gray-200 h-10": !isDrawer,
				"block md:hidden": isDrawer,
			})}
		>
			<nav
				role="navigation"
				aria-label="Main Navigation"
				className={classNames("container", {
					"p-0": isDrawer,
				})}
			>
				<ul
					className={classNames("flex", {
						"flex-col": isDrawer,
					})}
				>
					{data &&
						data.slice(0, 5).map((category) => (
							<li key={category} className="md:[&:first-child>a>span]:pl-0">
								<NavLink to={`/category/${category}`}>
									{({ isActive }) => (
										<span
											className={classNames(
												"flex items-center  h-10 capitalize font-semibold relative  transition-all",
												{
													"border-b px-2": !isDrawer,
													"border-b-transparent hover:border-b-primary-400":
														!isActive && !isDrawer,
													"border-b-primary-700 text-primary": isActive && !isDrawer,
													"p-4 hover:bg-slate-100 active:bg-slate-200": isDrawer,
													"bg-slate-100": isActive && isDrawer,
												}
											)}
										>
											{category}
										</span>
									)}
								</NavLink>
							</li>
						))}
				</ul>
			</nav>
		</div>
	);
}

export default MainNavigation;
