import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BuyBoxSkeleton = () => {
	return (
		<div className="flex flex-col gap-4">
			<header className="flex justify-between items-center font-bold">
				<h1 className="capitalize m-0">
					<Skeleton baseColor="#f8fafc" height={32} width={220} />
				</h1>
				<div className="flex items-center gap-2">
					{/* {discountPercentage ? <p className="text-2xl">${discountedPrice}</p> : <p className="text-2xl">${price}</p>} */}
					<Skeleton baseColor="#f8fafc" width={55} height={32} />
				</div>
			</header>
			<div className="flex justify-between md:items-center">
				<p className="flex flex-wrap items-center gap-2">
					<Skeleton baseColor="#f8fafc" height={21} width={221} />
				</p>
			</div>
			<h2 className="m-0">
				<Skeleton baseColor="#f8fafc" width={130} height={26} />
			</h2>
			<p className="flex flex-col gap-1 [&>[aria-live]]:w-full">
				<Skeleton baseColor="#f8fafc" height={15} width={"100%"} />
				<Skeleton baseColor="#f8fafc" height={15} width={"100%"} />
				<Skeleton baseColor="#f8fafc" height={15} width={"100%"} />
			</p>
			<div className="cta [&>[aria-live]]:w-full">
				{/* <form> */}
				<Skeleton baseColor="#f8fafc" height={45} width={"100%"} />
				{/* </form> */}
			</div>
		</div>
	);
};

export default BuyBoxSkeleton;
