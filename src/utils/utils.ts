import { Product } from "@/types/Product";

export const calculateDiscountedPrice = (
	originalPrice: number,
	discountPercentage: number
) => {
	// Calculate the discount amount
	const discountAmount = (discountPercentage / 100) * originalPrice;

	// Calculate the discounted price
	const discountedPrice = originalPrice - discountAmount;

	// Return the discounted price
	return discountedPrice.toFixed(2);
};

export const filterByTitle = (arr: any[], query: string) => {
	const filteredArr = arr.filter((item) => item.title.toLowerCase() === query);
	return filteredArr;
};

export const getAllCategories = async () => {
	const controller = new AbortController();
	const signal = controller.signal;
	const fetchData = async () => {
		try {
			const res = await fetch(import.meta.env.VITE_APP_API_BASE_URL + `/catgories`, {
				signal,
			});
			if (!res.ok) throw new Error("No response to this request in Search Component");

			const json = await res.json();

			return json;
		} catch (error) {
			console.log(error);
		}
	};
};

export const calculateMinMaxPricesFromArrayOfProducts = (arr: Product[]) => {
	if (!arr || arr.length === 0) {
		return { minPrice: 0, maxPrice: 0 };
	}

	let minPrice = arr[0]?.price || 0;
	let maxPrice = arr[0]?.price || 0;

	for (const item of arr) {
		const price = item.price || 0;

		if (price > maxPrice) {
			maxPrice = price;
		}

		if (price < minPrice) {
			minPrice = price;
		}
	}

	return { minPrice, maxPrice };
};
