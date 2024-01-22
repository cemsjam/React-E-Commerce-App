import React from "react";

import { useWishlistStore } from "@/stores/wishlistStore";
import { useUser } from "@clerk/clerk-react";

import Card from "@/components/Cards/Card";
import { Product } from "@/types/Product";

const WishlistPage = () => {
	const { user } = useUser();
	const wishlists = useWishlistStore((state) => state.wishlists);
	const products = user ? wishlists[user.id] : wishlists["default"];
	console.log(products);
	return (
		<div className="container p-4">
			<h1>Wishlist</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{products?.map((product: Product) => <Card key={product.id} product={product} />)}
			</div>
		</div>
	);
};

export default WishlistPage;
