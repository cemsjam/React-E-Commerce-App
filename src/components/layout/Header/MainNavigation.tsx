import { NavLink } from "react-router-dom";
import classNames from "classnames";

import useFetch from "@/hooks/useFetch";
import { CategoryType } from "@/types/CategoryType";
import useMediaQuery from "@/hooks/useMediaQuery";

function MainNavigation({ onClick = () => {} }: { onClick?: () => void | null }) {
	const isMobile = useMediaQuery("(max-width:992px)");
	const { data } = useFetch<CategoryType>(import.meta.env.VITE_APP_API_BASE_URL, "/categories");
	return (
		<div
			className={classNames("", {
				"hidden lg:block border-b border-b-gray-200 h-10 bg-white": !isMobile,
				"block lg:hidden": isMobile,
			})}
		>
			<nav
				role="navigation"
				aria-label="Main Navigation"
				className={classNames("container", {
					"p-0": isMobile,
				})}
			>
				<ul
					className={classNames("flex", {
						"flex-col": isMobile,
					})}
				>
					{data &&
						data.slice(0, 7).map((category) => (
							<li key={category.name} className="lg:[&:first-child>a>span]:pl-0">
								<NavLink to={`/category/${category.name}`}>
									{({ isActive }) => (
										<span
											onClick={onClick}
											className={classNames("flex items-center  h-10 uppercase relative transition-all ", {
												"border-b px-2 font-medium": !isMobile,
												"border-b-transparent hover:border-b-primary": !isActive && !isMobile,
												"border-b-primary text-primary": isActive && !isMobile,
												"p-4 hover:bg-primary active:bg-primary font-semibold": isMobile,
												"bg-primary text-white": isActive && isMobile,
											})}
										>
											{category.name}
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
