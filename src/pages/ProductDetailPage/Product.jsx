import useFetch from "@/hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import BuyBox from "./BuyBox";
import Breadcrumb from "@/layout/Breadcrumb";

function Product() {
  const { productId } = useParams();
  const { data } = useFetch(import.meta.env.VITE_APP_API_BASE_URL, `/${productId}`);
  const { title, images } = data;
  return (
    <>
      <Breadcrumb />
      <div className="flex flex-col md:flex-row gap-10 py-2 sm:p-4">
        <div className="flex-[7]">
          <ImageGallery images={images} title={title} />
        </div>
        <div className="flex-[5]">
          <BuyBox product={data} />
        </div>
      </div>
    </>
  );
}

export default Product;
