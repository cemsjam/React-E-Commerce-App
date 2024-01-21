import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { Product } from "@/types/Product";
import { CategoryType } from "@/types/CategoryType";

import useFetch from "@/hooks/useFetch";
import Card from "@/components/Cards/Card";
import { calculateMinMaxPricesFromArrayOfProducts } from "@/utils/utils";

const SearchPage = () => {
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const [listedProducts, setListedProducts] = useState<Product[]>([]);
	const searchQuery = searchParams.get("q");

	const { data: categories } = useFetch<CategoryType>(
		import.meta.env.VITE_APP_API_BASE_URL,
		`/categories`
	);
	const [filters, setFilters] = useState([
		{
			id: "category",
			name: "category",
			options: categories?.map((category) => ({
				value: category,
				label: category,
				checked: false,
			})),
		},
	]);

	const { minPrice, maxPrice } = useMemo(
		() => calculateMinMaxPricesFromArrayOfProducts(listedProducts),
		[listedProducts]
	);

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
				})
				.catch((err) => console.log(err));
		} else {
			setListedProducts(location.state.products);
		}
	}, []);

	const handleCheckboxChange = (section: string, selectedOption: string) => {};
	return (
		<div className="flex flex-col lg:flex-row gap-4">
			<aside className="bg-white p-2 radius-sm flex-[3]">
				{filters?.map(
					(section) =>
						section.options?.map((option) => (
							<div key={section.id} className="flex items-center">
								<input
									id={`filter-category-${option.value}`}
									name="category"
									defaultValue={""}
									type="checkbox"
									checked={option.checked}
									onChange={() => handleCheckboxChange(section.id, option.value)}
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								/>
								<label
									htmlFor={`filter-category-${option.value}`}
									className="ml-3 min-w-0 flex-1 text-base"
								>
									{option.label}
								</label>
							</div>
						))
				)}
				<div>
					<div className="relative mb-6">
						<label htmlFor="labels-range-input" className="sr-only">
							Labels range
						</label>
						<input
							id="labels-range-input"
							type="range"
							value={minPrice + (maxPrice - minPrice) / 2}
							min={minPrice?.toString()}
							max={maxPrice?.toString()}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
						/>
						<span className="text-sm text-gray-500  absolute start-0 -bottom-6">
							Min (${minPrice})
						</span>

						<span className="text-sm text-gray-500  absolute end-0 -bottom-6">
							Max (${maxPrice})
						</span>
					</div>
				</div>
			</aside>
			<div className="flex-[9]">
				<h1>SearchPage</h1>
				<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{listedProducts?.map((product: Product) => (
						<Card key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
