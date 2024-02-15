import { NavLink } from "react-router-dom";
import classNames from "classnames";

import useFetch from "@/hooks/useFetch";
import { CategoryType } from "@/types/CategoryType";
import useClickOutside from "@/hooks/useClickOutside";

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
						data.slice(0, 7).map((category) => (
							<li key={category} className="md:[&:first-child>a>span]:pl-0">
								<NavLink to={`/category/${category}`}>
									{({ isActive }) => (
										<span
											className={classNames(
												"flex items-center  h-10 uppercase font-medium relative transition-all ",
												{
													"border-b px-2": !isDrawer,
													"border-b-transparent hover:border-b-primary":
														!isActive && !isDrawer,
													"border-b-primary text-primary": isActive && !isDrawer,
													"p-4 hover:bg-primary active:bg-primary": isDrawer,
													"bg-primary": isActive && isDrawer,
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
