import React from "react";

import type { Product } from "@/types/Product";

import CardImage from "./CardImage";
import CardBody from "./CardBody";

function Card({ product }: { product: Product }) {
	return (
		<div className="bg-white h-full border border-gray-200 overflow-hidden rounded-md grid grid-rows-[auto,minmax(0,1fr)] group hover:shadow-lg transition-all">
			<CardImage product={product} />
			<CardBody product={product} />
		</div>
	);
}

export default React.memo(Card);
