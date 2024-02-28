import { useEffect, useMemo, useState } from "react";

import { Product } from "@/types/Product";
import { CategoryType } from "@/types/CategoryType";

import useFetch from "@/hooks/useFetch";
import { calculateMinMaxPricesFromArrayOfProducts } from "@/utils/utils";

import CollapsibleCheckboxList from "./CollapsibleCheckboxList";

type FilterComponentProps = {
	products: Product[];
	onFilterChange: (filters: Filters) => void;
};
export type Filters = {
	minPrice: number;
	maxPrice: number;
	categories: string[];
	minRating: string;
	brands: string[];
	// Add more filter criteria as needed
};

const FilterComponent = ({ products, onFilterChange }: FilterComponentProps) => {
	const [filters, setFilters] = useState<Filters>({
		minPrice: 0,
		maxPrice: 0,
		categories: [],
		minRating: "",
		brands: [],
		// Add more filter criteria as needed
	});
	const { data: categoriesData } = useFetch<CategoryType>(
		import.meta.env.VITE_APP_API_BASE_URL,
		`/categories`
	);

	const allBrands = useMemo(
		() =>
			products.reduce((acc: string[], item) => {
				if (item.brand && !acc.includes(item.brand)) {
					acc.push(item.brand);
				}
				return acc;
			}, []),
		[products]
	);

	// const { maxPrice, minPrice } = calculateMinMaxPricesFromArrayOfProducts(products);

	const handleFilterChange = (): void => {
		// Validate and sanitize filter values if needed
		onFilterChange(filters);
	};
	useEffect(() => {
		handleFilterChange();
	}, [filters]);

	const onCheckboxChange = (filterKey: "categories" | "brands", value: string): void => {
		setFilters((prevFilters) => {
			if (prevFilters[filterKey].includes(value)) {
				return {
					...prevFilters,
					[filterKey]: prevFilters[filterKey].filter((item) => item !== value),
				};
			} else {
				return {
					...prevFilters,
					[filterKey]: [...prevFilters[filterKey], value],
				};
			}
		});
	};

	return (
		<div>
			{/* <div>
				<h2>Price</h2>
				<label>Min Price:</label>
				<input
					type="number"
					value={filters.minPrice}
					onChange={(e) => setFilters({ ...filters, minPrice: +e.target.value })}
				/>

				<label>Max Price:</label>
				<input
					type="number"
					value={filters.maxPrice}
					onChange={(e) => setFilters({ ...filters, maxPrice: +e.target.value })}
				/>
			</div> */}
			{categoriesData && (
				<CollapsibleCheckboxList
					defaultOpen
					triggerTitle="Category"
					key={`Collapsible-Category`}
					arr={categoriesData.slice(0, 7)}
					onCheckboxChange={onCheckboxChange}
					filterProperty="categories"
				/>
			)}
			<CollapsibleCheckboxList
				triggerTitle="Brands"
				key={`Collapsible-Brands`}
				arr={allBrands}
				onCheckboxChange={onCheckboxChange}
				filterProperty="brands"
			/>

			{/* <button onClick={handleFilterChange}>Apply Filters</button> */}
		</div>
	);
};

export default FilterComponent;
