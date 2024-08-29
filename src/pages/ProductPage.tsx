import { useParams } from "react-router-dom";

import useFetch from "@/hooks/useFetch";

import { Product } from "@/types/Product";

import ImageGallery from "../components/ProductDetail/ImageGallery";
import BuyBox from "../components/ProductDetail/BuyBox";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ProductPageSkeleton } from "@/components/ProductDetail/ProductPageSkeleton";
import { NotFoundPage } from "./NotFoundPage";

function ProductPage() {
	const { productId } = useParams();
	const { data, loading, error } = useFetch<Product>(import.meta.env.VITE_APP_API_BASE_URL, `/${productId}`);
	console.log(error, data);
	if (loading) {
		return <ProductPageSkeleton />;
	}
	if (error) {
		return <NotFoundPage />;
	}
	if (data) {
		const { title, images } = data;

		return (
			<div className="container p-4">
				<Breadcrumb productName={title} isProductPage />
				<div className="flex flex-col md:flex-row gap-10 py-2 sm:p-4">
					<div className="flex-[7]">
						<ImageGallery images={images} title={title} />
					</div>
					<div className="flex-[5]">
						<BuyBox product={data} />
					</div>
				</div>
			</div>
		);
	}
}

export default ProductPage;
