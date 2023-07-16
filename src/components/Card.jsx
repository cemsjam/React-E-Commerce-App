import React from "react";
import { useCart } from "@/context/ShoppingCartContext";
import { toast } from "react-hot-toast";
import { useOffCanvas } from "@/context/OffcanvasContext";
import { Link } from "react-router-dom";
import Button from "./Button";
function Card({ product }) {
  const { id, title, description, stock, price, thumbnail } = product;
  const { dispatch } = useCart();
  const { toggleOffcanvas } = useOffCanvas();
  const addToCart = (item) => {
    toggleOffcanvas();
    dispatch({ type: "ADD_TO_CART", payload: item });
    toast.success(`Added ${product.title} To Cart`);
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

        <Button variant="primary" size="md" type="button" className="mt-auto" onClick={() => addToCart(product)}>
          Add To Cart
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Card);
