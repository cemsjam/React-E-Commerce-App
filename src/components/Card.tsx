import React from "react";
import type { Product } from "@/types/Product";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { useCartStore } from "@/stores/cartStore";
import { useOffcanvasStore } from "@/stores/offcanvasStore";

import Button from "./Button";
import { useModalStore } from "@/stores/modalStore";

function Card({ product }: { product: Product }) {
  const { id, title, description, stock, price, thumbnail } = product;
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleOffcanvas = useOffcanvasStore((state) => state.toggleOffcanvas);
  const append = useModalStore((state) => state.append);

  const handleAddToCart = (product: Product) => {
    append("register");
    append("login");

    if (product) {
      toggleOffcanvas();
      toast.success(`${product.title} has been added to cart!`);
      addToCart(product);
    }
  };

  return (
    <div className="h-full border border-gray-200 overflow-hidden shadow-md rounded-md grid grid-rows-[auto,minmax(0,1fr)]">
      <div className="img-wrapper h-32 p-2">
        <Link className="h-full" to={`/products/${id}`}>
          <img
            width={300}
            height={130}
            className="block w-full max-w-full h-full object-contain"
            src={thumbnail}
            alt={title}
          />
        </Link>
      </div>
      <div className="body p-4 flex flex-col gap-3">
        <Link to={`/products/${id}`}>
          <h2 className="capitalize font-bold m-0">{title}</h2>
        </Link>
        <p className="line-clamp-3 text-gray-600">{description}</p>
        <p className="text-xs text-gray-600">Stock: {stock}</p>
        <p className="text-indigo-700 font-bold">${price}</p>

        <Button
          variant="primary"
          buttonSize="md"
          type="button"
          className="mt-auto"
          onClick={() => handleAddToCart(product)}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Card);
