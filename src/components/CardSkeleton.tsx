import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
	return (
		<div className="bg-white h-[378.25px] border border-gray-200 overflow-hidden rounded-md grid grid-rows-[auto,minmax(0,1fr)] gap-4 group">
			<div className="img-wrapper h-32 p-2 relative">
				<Skeleton height={130} />
			</div>
			<div className="body p-2 flex flex-col justify-between">
				<div>
					<Skeleton />
				</div>
				<div className="flex flex-col gap-1 mb-4">
					<Skeleton />
					<Skeleton width={"75%"} />
					<Skeleton width={"35%"} />
					<Skeleton style={{ marginTop: "2rem" }} width={"20%"} />
				</div>
				<Skeleton height={37} className="radius-md" />
			</div>
		</div>
	);
};

export default CardSkeleton;
