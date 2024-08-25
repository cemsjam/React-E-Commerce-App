import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../CardSkeleton";

export const SearchPageSkeleton = () => {
	return (
		<div className="bg-white h-full">
			<div className="container p-4">
				<div className="flex flex-col lg:flex-row gap-4">
					<aside className="bg-white p-3 radius-sm flex-[3]">
						<div className="flex flex-col gap-1 mb-4">
							<Skeleton />
							<Skeleton width={"75%"} />
							<Skeleton width={"35%"} />
							<Skeleton style={{ marginTop: "2rem" }} width={"20%"} />
						</div>
					</aside>
					<div className="flex-[9]">
						<h1 className="mt-4">SearchPage</h1>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{Array.from({ length: 4 }, (_, i) => (
								<CardSkeleton key={`product-slider-skeleton-${i}`} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
