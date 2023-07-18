import React, { useMemo } from "react";
import { AiFillStar } from "react-icons/ai";

import { useCartStore } from "@/stores/cartStore";
import { useOffcanvasStore } from "@/stores/offcanvasStore";

import { calculateDiscountedPrice } from "@/utils/utils";
import Button from "@/components/Button";

function BuyBox({ product }) {
  const { title, description, price, rating, discountPercentage } = product;
  const { addToCart } = useCartStore();
  const { toggleOffcanvas } = useOffcanvasStore();

  const handleAddToCart = (product) => {
    if (product) {
      toggleOffcanvas();
      toast.success(`${product.title} has been added to cart!`);
      addToCart(product);
    }
  };
  //#region discount calculation
  const discountedPrice = useMemo(() => {
    if (!discountPercentage) return;
    return calculateDiscountedPrice(price, discountPercentage);
  }, [price, discountPercentage]);
  const ratingArr = useMemo(() => {
    return Array.from({ length: 5 }, (_) => <AiFillStar />);
  }, []);
  //#endregion

  return (
    <div className="flex flex-col gap-4">
      <header className="flex justify-between items-center font-bold">
        <h1 className="capitalize m-0">{title}</h1>
        <div className="flex items-center gap-2">
          {discountPercentage ? <p className="text-2xl">${discountedPrice}</p> : <p className="text-2xl">${price}</p>}
        </div>
      </header>
      <div className="flex justify-between md:items-center">
        <p className="flex flex-wrap items-center gap-2">
          {rating}
          <span className="inline-flex gap-[2px]">
            {ratingArr.map((star, i) => (
              <span className="text-yellow-400" key={i}>
                {star}
              </span>
            ))}
          </span>
          <a className="text-indigo-700 font-semibold" href="/">
            See All Reviews
          </a>
        </p>
        {discountPercentage && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <p className="text-white bg-red-500 p-1 rounded-md font-semibold">% {discountPercentage}</p>
            <p className="text-gray-500 line-through">${price}</p>
          </div>
        )}
      </div>
      <h2 className="m-0">Description</h2>
      <p className="text-gray-600">{description}</p>
      <div className="cta">
        {/* <form> */}
        <Button
          variant="primary"
          size="lg"
          alignment="center"
          fit="full"
          type="submit"
          onClick={() => handleAddToCart(product)}
        >
          Add To Cart
        </Button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default BuyBox;
