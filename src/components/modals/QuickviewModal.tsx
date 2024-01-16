import { Product } from "@/types/Product";
import React from "react";
import ModalHeader from "./ModalHeader";
import ImageGallery from "@/components/ProductDetail/ImageGallery";
import BuyBox from "@/components/ProductDetail/BuyBox";

const QuickviewModal = ({ modalData: product }: { modalData: Product }) => {
	if (!product) return null;
	const { images, title } = product;
	return (
		<div>
			<ModalHeader title="Quickview" classNames="p-4" closeAll />
			<div className="flex flex-col md:flex-row px-4 pb-4 gap-4">
				<div className="flex-[6]">
					<ImageGallery images={images} title={title} />
				</div>
				<div className="flex-[6] flex items-center">
					<BuyBox product={product} />
				</div>
			</div>
		</div>
	);
};

export default QuickviewModal;
