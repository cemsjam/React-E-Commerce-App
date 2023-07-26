import React from "react";
import { Product } from "@/types/Product";

function Suggestions({ products }: { products: Product[] }) {
  return products.map(({ id, title, price, thumbnail }: Product) => (
    <li
      key={id}
      className="flex-1 min-[175px] flex flex-col gap-2 p-2 justify-center items-center text-center hover:bg-gray-200 cursor-pointer"
    >
      <img className="w-8 h-8" src={thumbnail} alt={title} width={40} height={40} />
      <span className="flex-1">{title}</span>
      <span className="text-indigo-700 font-bold">${price}</span>
    </li>
  ));
}

export default Suggestions;
