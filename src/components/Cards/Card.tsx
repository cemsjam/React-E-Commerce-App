import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import type { Product } from "@/types/Product";

import { useCartStore } from "@/stores/cartStore";
import { useOffcanvasStore } from "@/stores/offcanvasStore";

import Button from "../Button";
import CardImage from "./CardImage";

function Card({ product }: { product: Product }) {
	const { id, title, description, stock, price } = product;
	const addToCart = useCartStore((state) => state.addToCart);
	const toggleOffcanvas = useOffcanvasStore((state) => state.toggleOffcanvas);

	const handleAddToCart = (product: Product) => {
		if (product) {
			toggleOffcanvas();
			toast.success(`${product.title} has been added to Cart!`);
			addToCart(product);
		}
	};

	return (
		<div className="bg-white h-full border border-gray-200 overflow-hidden rounded-md grid grid-rows-[auto,minmax(0,1fr)] group hover:shadow-lg transition-all">
			<CardImage product={product} />
			<div className="body p-4 flex flex-col gap-3">
				<Link to={`/product/${id}`}>
					<h2 className="capitalize font-bold m-0">{title}</h2>
				</Link>
				<p className="line-clamp-3 text-gray-600">{description}</p>
				<p className="text-xs text-gray-600">Stock: {stock}</p>
				<p className="text-primary font-bold">${price}</p>

				<Button
					variant="primary"
					buttonSize="md"
					type="button"
					className="mt-auto transition-all hover:scale-105"
					onClick={() => handleAddToCart(product)}
				>
					Add To Cart
				</Button>
			</div>
		</div>
	);
}

export default React.memo(Card);
