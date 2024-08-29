import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { Product } from "@/types/Product";

import Card from "@/components/Cards/Card";
import FilterComponent from "@/components/SearchPage/FilterComponent";
import { Filters } from "@/components/SearchPage/useFilter";
import { SearchPageSkeleton } from "@/components/SearchPage/SearchPageSkeleton";

const SearchPage = () => {
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const [listedProducts, setListedProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const searchQuery = searchParams.get("q");

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		console.log(location.state);
		if (!location.state || location.state.products.length < 0) {
			setLoading(true);
			fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/search?q=${searchQuery}`, { signal })
				.then((res) => {
					if (!res.ok) {
						setLoading(false);
						throw new Error("Something went wrong from server");
					} else {
						return res.json();
					}
				})
				.then((json) => {
					setListedProducts(json.products);
					setFilteredProducts(json.products);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		} else {
			setListedProducts(location.state.products);
			setFilteredProducts(location.state.products);
		}
		return () => controller.abort();
	}, [searchQuery]);

	const handleFilterChange = (filters: Filters) => {
		const filtered = [...listedProducts].filter((product) => {
			// const priceFilter =
			// 	(!filters.minPrice || product.price >= filters.minPrice) &&
			// 	(!filters.maxPrice || product.price <= filters.maxPrice);

			const categoryFilter =
				filters.categories.length === 0 || filters.categories.includes(product.category.toLowerCase());

			// const ratingFilter =
			// 	!filters.minRating || product.rating >= parseFloat(filters.minRating);

			const brandFilter =
				(product.brand && filters.brands.length === 0) ||
				(product.brand && filters.brands.includes(product.brand.toLowerCase()));

			// Add more filter criteria as needed

			// return priceFilter && categoryFilter && ratingFilter && brandFilter;
			return categoryFilter && brandFilter;
		});
		setFilteredProducts(filtered);
	};
	if (loading) {
		return <SearchPageSkeleton />;
	}
	return (
		<div className="bg-white h-full">
			<div className="container p-4">
				<div className="flex flex-col lg:flex-row gap-4">
					<aside className="bg-white p-3 radius-sm flex-[3]">
						<FilterComponent products={listedProducts} onFilterChange={handleFilterChange} />
					</aside>
					<div className="flex-[9]">
						<h1 className="mt-4">SearchPage</h1>
						<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
							{filteredProducts?.map((product: Product) => <Card key={product.id} product={product} />)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
