import classNames from "classnames";
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

function ImageGallery({ title, images }: { title: string; images: string[] }) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const [cursor, setCursor] = useState("grab");
	console.log(images);
	useEffect(() => {
		if (!api) {
			return;
		}
		setCount(api.scrollSnapList().length - 1);
		setCurrent(api.selectedScrollSnap());
		api.on("select", () => {
			console.log("dragging");
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
								<CarouselItem key={img} className="flex items-center justify-center">
									<img
										src={img}
										alt={title}
										className={cn("object-contain m-auto rounded-md", {
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
						className={classNames("rounded-md overflow-hidden object-cover border-2 h-[80px] aspect-square", {
							"border-primary": i === current,
							"border-slate-300": i !== current,
						})}
						key={img}
					>
						<button type="button" className="block h-full p-1" onClick={() => api?.scrollTo(i)}>
							<img className="object-contain" src={img} alt={title} />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ImageGallery;
