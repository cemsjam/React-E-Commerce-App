import type { Product, Products } from "@/types/Product";
import { useParams } from "react-router-dom";

import useFetch from "@/hooks/useFetch";
import Card from "@/components/Cards/Card";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CardSkeleton from "@/components/CardSkeleton";

type CategoryData = {
	products: Products;
	skip: number;
	total: number;
	limit: number;
};

function Category() {
	const { categoryId } = useParams();
	const formattedCategoryId = categoryId?.replace(/\s+/g, "-").toLowerCase();
	const { data, loading } = useFetch<CategoryData>(
		import.meta.env.VITE_APP_API_BASE_URL,
		`/category/${formattedCategoryId}`
	);
	if (loading || !data) {
		return (
			<div className="container p-4">
				<Breadcrumb />
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{Array.from({ length: 8 }, (_, i) => (
						<CardSkeleton key={"category-skeleton" + i} />
					))}
				</div>
			</div>
		);
	} else if (data && data.products) {
		return (
			<div className="container p-4">
				<Breadcrumb />
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{data.products.map((product: Product) => (
						<Card key={product.id} product={product} />
					))}
				</div>
			</div>
		);
	}
}

export default Category;
