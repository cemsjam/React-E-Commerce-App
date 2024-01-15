import VisualOnlySvg from "@/components/VisualOnlySvg";
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type BreadcrumbTypes = {
	productName?: string;
	isProductPage?: boolean;
};

const Breadcrumb = ({ productName, isProductPage = false }: BreadcrumbTypes) => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);
	return (
		<div className="overflow-hidden">
			<ul className="mb-4 flex items-center gap-2 flex-nowrap overflow-x-auto [&>li]:whitespace-nowrap">
				<li className="flex items-center gap-2">
					<Link to="/" aria-label="Visit Home Page">
						<VisualOnlySvg>
							<Home size={14} />
						</VisualOnlySvg>
					</Link>
					<VisualOnlySvg>
						<ChevronRight size={14} />
					</VisualOnlySvg>
				</li>
				{pathnames.map((name, index) => {
					const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
					const isNonNavigatable = name === "category" || name === "product";
					const isLastElement = index === pathnames.length - 1;
					const capitalizedName = name[0].toUpperCase() + name.slice(1);
					return isLastElement ? (
						<li key={index}>{isProductPage ? productName : capitalizedName}</li>
					) : (
						!isNonNavigatable && (
							<li className="flex items-center gap-2" key={index}>
								<Link to={routeTo}>{isProductPage ? productName : capitalizedName}</Link>
								<VisualOnlySvg>
									<ChevronRight size={14} />
								</VisualOnlySvg>
							</li>
						)
					);
				})}
			</ul>
		</div>
	);
};

export default Breadcrumb;
