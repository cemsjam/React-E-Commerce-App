import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { View, Heart } from "lucide-react";
import type { Product } from "@/types/Product";
import { useUser } from "@clerk/clerk-react";

import { useCartStore } from "@/stores/cartStore";
import { useOffcanvasStore } from "@/stores/offcanvasStore";
import { useModalStore } from "@/stores/modalStore";
import { useWishlistStore } from "@/stores/wishlistStore";

import Button from "./Button";
import VisualOnlySvg from "./VisualOnlySvg";

function Card({ product }: { product: Product }) {
	const { id, title, description, stock, price, thumbnail } = product;
	const addToCart = useCartStore((state) => state.addToCart);
	const addToWishlist = useWishlistStore((state) => state.addToWishlist);
	// const wishlistItems = useWishlistStore((state) => state.wishlistItems);
	const { user } = useUser();
	const toggleOffcanvas = useOffcanvasStore((state) => state.toggleOffcanvas);
	const append = useModalStore((state) => state.append);
	const handleAddToCart = (product: Product) => {
		if (product) {
			toggleOffcanvas();
			toast.success(`${product.title} has been added to Cart!`);
			addToCart(product);
		}
	};
	console.log(user?.primaryEmailAddress?.emailAddress);
	const handleAddToWishlist = (product: Product) => {
		if (product) {
			toast.success(`${product.title} has been added to Wishlist!`);
			addToWishlist(product);
		}
	};

	const handleQuickviewModal = (product: Product) => {
		append("quickview", product);
	};

	return (
		<div className="bg-white h-full border border-gray-200 overflow-hidden rounded-md grid grid-rows-[auto,minmax(0,1fr)] group hover:shadow-lg transition-all">
			<div className="img-wrapper h-32 p-2 relative">
				<Link className="h-full " to={`/product/${id}`}>
					<img
						width={300}
						height={130}
						className="block w-full max-w-full h-full object-contain"
						src={thumbnail}
						alt={title}
					/>
				</Link>
				<button
					type="button"
					aria-label="Toggle quickview"
					className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg absolute top-2 right-2 hover:text-primary transition-all opacity-0 group-hover:opacity-100"
					onClick={() => handleQuickviewModal(product)}
				>
					<View size={16} />
				</button>
				<Button
					type="button"
					className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg absolute top-12 right-2 hover:text-primary transition-all opacity-0 group-hover:opacity-100"
					aria-label="Visit Wishlist Page"
					onClick={() => handleAddToWishlist(product)}
				>
					<VisualOnlySvg>
						<Heart size={20} />
					</VisualOnlySvg>
				</Button>
			</div>
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
