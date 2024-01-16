import { useParams } from "react-router-dom";

import useFetch from "@/hooks/useFetch";

import { Product } from "@/types/Product";

import ImageGallery from "../components/ProductDetail/ImageGallery";
import BuyBox from "../components/ProductDetail/BuyBox";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Loader from "@/components/Loader";

function ProductPage() {
	const { productId } = useParams();
	const { data, loading } = useFetch<Product>(
		import.meta.env.VITE_APP_API_BASE_URL,
		`/${productId}`
	);
	if (loading) {
		return <Loader />;
	}
	if (!data) {
		return <div>This Product Is Not Available At The Moment.</div>;
	}
	const { title, images } = data;

	return (
		<>
			<Breadcrumb productName={title} isProductPage />
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

export default ProductPage;
