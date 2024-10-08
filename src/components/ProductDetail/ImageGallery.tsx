import { useEffect, useState } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselApi,
} from "@/components/Carousel/Carousel";
import { cn } from "@/lib/utils";

type ImageGalleryProps = {
	title: string;
	images: string[];
	isQuickViewModal?: boolean;
};

function ImageGallery({ title, images, isQuickViewModal = false }: ImageGalleryProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const [cursor, setCursor] = useState("grab");
	useEffect(() => {
		if (!api) {
			return;
		}
		setCount(api.scrollSnapList().length - 1);
		setCurrent(api.selectedScrollSnap());
		api.on("select", () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);
	const handleCursorDown = () => {
		setCursor("grabbing");
	};
	const handleCursorUp = () => {
		setCursor("grab");
	};
	return (
		<div>
			<div className="w-full bg-white border border-gray-200 p-4 flex rounded-md">
				{images && (
					<Carousel setApi={setApi}>
						<CarouselContent>
							{images.map((img) => (
								<CarouselItem
									key={img}
									className={cn("flex items-center justify-center", {
										"h-[350px]": isQuickViewModal,
										"h-[350px] lg:h-[600px]": !isQuickViewModal,
									})}
								>
									<img
										src={img}
										alt={title}
										width={600}
										height={600}
										className={cn("object-contain m-auto rounded-md w-full h-full", {
											"cursor-grab": cursor === "grab",
											"cursor-grabbing": cursor === "grabbing",
										})}
										onMouseDown={() => api?.on("pointerDown", handleCursorDown)}
										onMouseUp={() => api?.on("pointerUp", handleCursorUp)}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						{images.length > 1 && (
							<>
								<CarouselPrevious className="-left-4 disabled:opacity-30 disabled:cursor-default  flex items-center justify-center" />
								<CarouselNext className="-right-4 disabled:opacity-30 disabled:cursor-default  flex items-center justify-center" />
							</>
						)}
					</Carousel>
				)}
			</div>
			<ul className="flex flex-wrap justify-center gap-2 mt-4">
				{images.map((img, i) => (
					<li
						className={cn("rounded-md overflow-hidden object-cover border-2 h-[80px] aspect-square", {
							"border-primary": i === current,
							"border-slate-300": i !== current,
						})}
						key={img}
					>
						<button type="button" className="block h-full w-full p-1" onClick={() => api?.scrollTo(i)}>
							<img className="object-contain h-full w-full" src={img} alt={title} />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ImageGallery;
