import React from "react";
import { ImageGallerySkeleton } from "./ImageGallerySkeleton";
import BuyBoxSkeleton from "./BuyBoxSkeleton";
import Breadcrumb from "../layout/Breadcrumb";
import ModalHeader from "../modals/ModalHeader";

export const ProductPageSkeleton = ({ isQuickViewModal = false }: { isQuickViewModal?: boolean }) => {
	if (isQuickViewModal) {
		<div className="max-w-screen-xl">
			<ModalHeader title="Quickview" classNames="p-4" closeAll />
			<div className="flex flex-col md:flex-row px-4 pb-4 gap-4">
				<div className="flex-[6]">
					<ImageGallerySkeleton />
				</div>
				<div className="flex-[6]">
					<BuyBoxSkeleton />
				</div>
			</div>
		</div>;
	}
	return (
		<div className="container p-4">
			<Breadcrumb productName={"Loading..."} isProductPage />
			<div className="flex flex-col md:flex-row gap-10 py-2 sm:p-4">
				<div className="flex-[7]">
					<ImageGallerySkeleton />
				</div>
				<div className="flex-[5]">
					<BuyBoxSkeleton />
				</div>
			</div>
		</div>
	);
};
