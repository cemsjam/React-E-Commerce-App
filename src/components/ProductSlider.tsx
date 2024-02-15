import useFetch from "@/hooks/useFetch";
import { Products } from "@/types/Product";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselApi,
} from "@/components/Carousel/Carousel";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useEffect, useState } from "react";
import Card from "./Cards/Card";
import CardSkeleton from "./CardSkeleton";

type ProductSliderType = {
	categoryName: string;
};

type ProductsData = {
	products: Products;
	skip: number;
	total: number;
	limit: number;
};

const ProductSlider = ({ categoryName }: ProductSliderType) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const { data, loading } = useFetch<ProductsData>(
		import.meta.env.VITE_APP_API_BASE_URL,
		`/category/${categoryName}`
	);
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

	if (loading || !data) {
		return (
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{Array.from({ length: 4 }, (_, i) => (
					<CardSkeleton key={`product-slider-skeleton-${i}`} />
				))}
			</div>
		);
	}

	return (
		<div>
			<Carousel
				opts={{
					align: "start",
				}}
				setApi={setApi}
				className="w-full max-w-sm md:max-w-full"
			>
				<CarouselContent className="lg:p-4">
					{data?.products?.map((product) => (
						<CarouselItem
							className="basis-1/2 md:basis-1/3 lg:basis-1/4 "
							key={`${product.title}-${product.id}`}
						>
							<Card product={product} />
						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselNext className="right-4" />
			<CarouselPrevious className="left-4" /> */}
			</Carousel>
		</div>
	);
};

export default ProductSlider;
