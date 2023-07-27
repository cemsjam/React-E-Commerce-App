import { Product } from "@/types/Product";
import React from "react";
import ModalHeader from "./ModalHeader";
import ImageGallery from "@/pages/ProductDetailPage/ImageGallery";
import BuyBox from "@/pages/ProductDetailPage/BuyBox";

const QuickviewModal = ({ modalData: product }: { modalData: Product }) => {
  if (!product) return null;
  const { images, title } = product;
  return (
    <div>
      <ModalHeader title="Quickview" classNames="px-4 md:px-8 pt-4 pb-0" closeAll />
      <div className="flex flex-col md:flex-row p-4 md:p-8 gap-4">
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
