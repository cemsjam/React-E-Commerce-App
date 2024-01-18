import { View, Heart } from "lucide-react";
import { toast } from "react-hot-toast";
import type { Product } from "@/types/Product";

import { useUser } from "@clerk/clerk-react";
import { useModalStore } from "@/stores/modalStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import VisualOnlySvg from "../VisualOnlySvg";
import { Link } from "react-router-dom";
import Button from "../Button";
import { cn } from "@/lib/utils";

const CardImage = ({ product }: { product: Product }) => {
	const { id, thumbnail, title } = product;
	const { user } = useUser();

	const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
	const append = useModalStore((state) => state.append);
	const isProductInWishlist = useWishlistStore((state) =>
		state.isProductInWishlist({ currentUser: user, product })
	);
	const handleToggleWishlist = (product: Product) => {
		if (product) {
			toast.success(`${product.title} has been added to Wishlist!`);
			toggleWishlist({ currentUser: user, product });
		}
	};

	const handleQuickviewModal = (product: Product) => {
		append("quickview", product);
	};
	return (
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
				onClick={() => handleToggleWishlist(product)}
			>
				<VisualOnlySvg>
					<Heart
						size={20}
						className={cn("", { "fill-primary stroke-primary": isProductInWishlist })}
					/>
				</VisualOnlySvg>
			</Button>
		</div>
	);
};

export default CardImage;
