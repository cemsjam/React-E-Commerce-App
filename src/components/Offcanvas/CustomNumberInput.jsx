import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";

import { useCart } from "@/context/ShoppingCartContext";
import VisualOnlySvg from "../VisualOnlySvg";

function CustomNumberInput({ product }) {
  const [input, setInput] = useState({ value: 1, max: 100, min: 1, step: 1 });
  const { dispatch } = useCart();
  const handleQuantityChange = (product) => {
    const newQuantity = input.value;
    const changedProduct = { ...product, quantity: newQuantity };
    dispatch({ type: "CHANGE_QUANTITY", payload: changedProduct });
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
        className="bg-indigo-700 text-white w-5 h-5 inline-flex items-center justify-center rounded-sm"
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
        className="bg-indigo-700 text-white w-5 h-5 inline-flex items-center justify-center rounded-sm"
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
