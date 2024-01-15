import React, { useEffect, useState } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselApi,
} from "@/components/Carousel/Carousel";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const HeroSlider = () => {
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
			console.log("dragging");
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);
	return (
		<Carousel setApi={setApi}>
			<CarouselContent className="lg:h-[600px] m-0">
				<CarouselItem
					className={cn("relative p-0", {
						"invisible opacity-0 transition-all": current !== 0,
					})}
				>
					<img
						src="/images/home/home-page-hero-01.jpg"
						alt="A laptop"
						className="object-cover h-full w-full"
					/>
					<div className="absolute inset-0 bg-[rgb(17,24,39,0.6)] z-[100]">
						<div className="flex flex-col justify-center items-center text-center p-4 md:max-w-[65ch] lg:max-w-[75ch] mx-auto h-full text-white">
							<h1 className="text-xl md:text-4xl font-bold">
								Unleash the Power of Electronics
							</h1>
							<p className="text-sm md:text-base">
								{" "}
								Dive into cutting-edge electronics, transform your space. Share on socials;
								likes will surpass life updates. Embrace tech evolution. Elevate your
								workspace.
							</p>
							<Link
								to="/"
								className="text-sm md:text-base mt-3 md:mt-6 bg-white p-2 md:p-3 rounded-md text-black font-semibold"
							>
								{" "}
								Explore Electronics Collection
							</Link>
						</div>
					</div>
				</CarouselItem>
				<CarouselItem
					className={cn("relative p-0", {
						"invisible opacity-0 transition-all": current !== 1,
					})}
				>
					<img
						src="/images/home/home-page-hero-02.jpg"
						alt="A laptop"
						className="object-cover h-full w-full"
					/>
					<div className="absolute inset-0 bg-[rgb(17,24,39,0.4)] z-[100]">
						<div className="flex flex-col justify-center items-center text-center p-4 md:max-w-[65ch] lg:max-w-[75ch] mx-auto h-full text-white">
							<h1 className="text-xl md:text-4xl font-bold">
								Unleash the Power of Electronics
							</h1>
							<p className="text-sm md:text-base">
								{" "}
								Dive into cutting-edge electronics, transform your space. Share on socials;
								likes will surpass life updates. Embrace tech evolution. Elevate your
								workspace.
							</p>
							<Link
								to="/"
								className="text-sm md:text-base mt-3 md:mt-6 bg-white p-2 md:p-3 rounded-md text-black font-semibold"
							>
								{" "}
								Explore Electronics Collection
							</Link>
						</div>
					</div>
				</CarouselItem>
			</CarouselContent>
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
				<button
					type="button"
					aria-label="Slide to first"
					className={cn("h-[3px] w-[30px] bg-white opacity-50", {
						"opacity-100": current === 0,
					})}
					onClick={() => api?.scrollTo(0)}
				></button>
				<button
					type="button"
					aria-label="Slide to second"
					className={cn("h-[3px] w-[30px] bg-white opacity-50", {
						"opacity-100": current === 1,
					})}
					onClick={() => api?.scrollTo(1)}
				></button>
			</div>
		</Carousel>
	);
};

export default HeroSlider;
