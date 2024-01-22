import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { Product } from "@/types/Product";

import Card from "@/components/Cards/Card";
import FilterComponent, { type Filters } from "@/components/SearchPage/FilterComponent";

const SearchPage = () => {
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const [listedProducts, setListedProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const searchQuery = searchParams.get("q");

	useEffect(() => {
		if (!location.state || location.state.products.length < 0) {
			fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/search?q=${searchQuery}`)
				.then((res) => {
					if (!res.ok) {
						throw new Error("Something went wrong from server");
					} else {
						return res.json();
					}
				})
				.then((json) => {
					setListedProducts(json.products);
					setFilteredProducts(json.products);
				})
				.catch((err) => console.log(err));
		} else {
			setListedProducts(location.state.products);
			setFilteredProducts(location.state.products);
		}
	}, [searchParams]);

	const handleFilterChange = (filters: Filters) => {
		// Implement your filtering logic based on the filters
		// You can use array filter, lodash, or any other library for filtering

		// For example, using array filter:
		const filtered = listedProducts.filter((product) => {
			const priceFilter =
				(!filters.minPrice || product.price >= filters.minPrice) &&
				(!filters.maxPrice || product.price <= filters.maxPrice);

			const categoryFilter =
				filters.categories.length === 0 || filters.categories.includes(product.category);

			const ratingFilter =
				!filters.minRating || product.rating >= parseFloat(filters.minRating);

			const brandFilter =
				filters.brands.length === 0 || filters.brands.includes(product.brand);

			// Add more filter criteria as needed

			return priceFilter && categoryFilter && ratingFilter && brandFilter;
		});
		console.log("filtered", filtered);
		setFilteredProducts(filtered);
	};
	return (
		<div className="container p-4 bg-white h-full">
			<div className="flex flex-col lg:flex-row gap-4">
				<aside className="bg-white p-3 radius-sm flex-[3]">
					<FilterComponent products={listedProducts} onFilterChange={handleFilterChange} />
				</aside>
				<div className="flex-[9]">
					<h1 className="mt-4">SearchPage</h1>
					<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{filteredProducts?.map((product: Product) => (
							<Card key={product.id} product={product} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
