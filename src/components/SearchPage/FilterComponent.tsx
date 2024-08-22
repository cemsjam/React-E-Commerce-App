import { useEffect, useMemo, useState } from "react";

import { Product } from "@/types/Product";
import { CategoryType } from "@/types/CategoryType";

import useFetch from "@/hooks/useFetch";
import { calculateMinMaxPricesFromArrayOfProducts } from "@/utils/utils";

import CollapsibleCheckboxList from "./CollapsibleCheckboxList";
import { useSearchParams } from "react-router-dom";

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
};

const FilterComponent = ({ products, onFilterChange }: FilterComponentProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filters, setFilters] = useState<Filters>({
		minPrice: 0,
		maxPrice: 0,
		minRating: "",
		categories: searchParams.get("categories")?.split(",") || [],
		brands: searchParams.get("brands")?.split(",") || [],
	});
	const { data: categoriesData } = useFetch<CategoryType>(import.meta.env.VITE_APP_API_BASE_URL, `/categories`);

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
	console.log("filters", filters);
	const handleFilterChange = (): void => {
		onFilterChange(filters);
	};

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		const query = params.get("q") || "app";
		params.set("q", query);
		for (const [key, value] of Object.entries(filters)) {
			if (Array.isArray(value) && value.length > 0) {
				params.set(key, value.join(","));
			} else {
				params.delete(key);
			}
		}

		setSearchParams(params);
		handleFilterChange();
	}, [filters, searchParams, setSearchParams]);
	const onCheckboxChange = (filterKey: "categories" | "brands", value: string): void => {
		let newFilters = { ...filters };
		let newFilterArr = newFilters[filterKey];
		if (newFilterArr.includes(value)) {
			newFilters = { ...newFilters, [filterKey]: newFilterArr.filter((item) => item !== value) };

			setFilters(newFilters);
		} else {
			newFilterArr.push(value);
			newFilters = { ...newFilters, [filterKey]: newFilterArr };
			setFilters(newFilters);
		}
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
