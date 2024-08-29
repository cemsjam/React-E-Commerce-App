import { cn } from "@/lib/utils";
import { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ImageGallerySkeleton = () => {
	const dummyImages = useRef([1, 2]);
	return (
		<div>
			<div className="w-full bg-white border border-gray-200 p-4 flex rounded-md [&>[aria-live]]:w-full">
				<Skeleton width={"100%"} className="aspect-square" />
			</div>
			<ul className="flex flex-wrap justify-center gap-2 mt-4">
				{dummyImages.current.map((img, i) => (
					<li
						className={cn("rounded-md overflow-hidden object-cover border-2 h-[80px] aspect-square border-slate-300", {
							"border-primary": i === 1,
						})}
						key={img}
					></li>
				))}
			</ul>
		</div>
	);
};
