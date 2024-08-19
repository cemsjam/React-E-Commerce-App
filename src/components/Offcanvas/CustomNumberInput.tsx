import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { BiPlus, BiMinus } from "react-icons/bi";

import { Product } from "@/types/Product";

import { useCartStore } from "@/stores/cartStore";

import VisualOnlySvg from "../VisualOnlySvg";

function CustomNumberInput({ product }: { product: Product }) {
	const { user } = useUser();
	const [input, setInput] = useState({ value: product.quantity, max: 100, min: 1, step: 1 });
	const { changeQuantity } = useCartStore();
	const handleQuantityChange = (product: Product) => {
		if (product) {
			const newQuantity = input.value;
			const changedProduct = { ...product, quantity: newQuantity };
			changeQuantity({ currentUser: user, product: changedProduct });
		}
	};
	useEffect(() => {
		handleQuantityChange(product);
	}, [input.value]);
	const handleIncrement = () => {
		if (input.value === input.max) return;
		setInput((prev) => ({ ...prev, value: input.value + input.step }));
	};
	const handleDecrement = () => {
		if (input.value === input.min) return;
		setInput((prev) => ({ ...prev, value: input.value - input.step }));
	};
	return (
		<div className="flex">
			<button
				className="bg-primary text-white w-5 h-5 inline-flex items-center justify-center rounded-sm"
				onClick={handleDecrement}
				type="button"
				aria-label={`Decrement Quantity of ${product.title}`}
			>
				<VisualOnlySvg>
					<BiMinus />
				</VisualOnlySvg>
			</button>
			<input
				type="number"
				name="quantity"
				id="productQuantity"
				className="appearance-none text-center font-medium"
				onChange={(e) => setInput((prev) => ({ ...prev, value: +e.target.value }))}
				value={input.value}
				max={input.max}
				step={input.step}
				min={input.min}
			/>
			<button
				className="bg-primary text-white w-5 h-5 inline-flex items-center justify-center rounded-sm"
				onClick={handleIncrement}
				type="button"
				aria-label={`Increment Quantity of ${product.title}`}
			>
				<VisualOnlySvg>
					<BiPlus />
				</VisualOnlySvg>
			</button>
		</div>
	);
}

export default CustomNumberInput;
