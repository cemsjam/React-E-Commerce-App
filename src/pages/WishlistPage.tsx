import React from "react";

import { useWishlistStore } from "@/stores/wishlistStore";
import { useUser } from "@clerk/clerk-react";

import Card from "@/components/Cards/Card";
import { Product } from "@/types/Product";

const WishlistPage = () => {
	const { user, isLoaded } = useUser();
	const wishlists = useWishlistStore((state) => state.wishlists);
	const products = user ? wishlists[user.id] : wishlists["default"];
	if (isLoaded && products?.length <= 0) {
		return (
			<div className="container p-4 flex items-center justify-center h-full">
				<div className="flex flex-col text-center">
					<h1 className="text-3xl font-semibold">Your wishlist is empty</h1>
					<span>Keep an eye on products you like by adding them to your wishlist.</span>
				</div>
			</div>
		);
	}
	return (
		isLoaded && (
			<div className="container p-4">
				<h1>Wishlist</h1>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{isLoaded && products?.map((product: Product) => <Card key={product.id} product={product} />)}
				</div>
			</div>
		)
	);
};

export default WishlistPage;
