import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export type FilterType = {
	brands?: string;
	categories?: string;
};

export type Filters = {
	brands: string[];
	categories: string[];
};

export const useFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const categories =
		searchParams
			.get("categories")
			?.split(",")
			.filter((item) => item !== "")
			.join(",") || "";
	const brands =
		searchParams
			.get("brands")
			?.split(",")
			.filter((item) => item !== "")
			.join(",") || "";

	const filtersObj = {
		categories: categories ? categories.split(",") : [],
		brands: brands ? brands.split(",") : [],
	};

	const setFilters = useCallback(
		(filters: FilterType) => {
			const params = new URLSearchParams(searchParams);
			if (filters.categories) {
				const categoriesList = new Set(filtersObj.categories);
				if (categoriesList.has(filters.categories)) {
					categoriesList.delete(filters.categories);
				} else {
					categoriesList.add(filters.categories);
				}

				if (categoriesList.size > 0) {
					params.set("categories", Array.from(categoriesList).join(","));
				} else {
					params.delete("categories");
				}
			}

			// Handle brands
			if (filters.brands) {
				const brandsList = new Set(filtersObj.brands);

				if (brandsList.has(filters.brands)) {
					brandsList.delete(filters.brands);
				} else {
					brandsList.add(filters.brands);
				}

				if (brandsList.size > 0) {
					params.set("brands", Array.from(brandsList).join(","));
				} else {
					params.delete("brands");
				}
			}

			// Update the URL with new search parameters
			setSearchParams(params);
		},
		[searchParams]
	);

	return { setFilters, categories, brands, filtersObj };
};
