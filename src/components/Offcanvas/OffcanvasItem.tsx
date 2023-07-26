import type { Product } from "@/types/Product";
import { PiTrash } from "react-icons/pi";
import { toast } from "react-hot-toast";

import { useCartStore } from "@/stores/cartStore";

import CustomNumberInput from "./CustomNumberInput";
import VisualOnlySvg from "../VisualOnlySvg";

function OffcanvasItem({ product }: { product: Product }) {
  const { title, price, thumbnail, quantity } = product;
  const removeItem = useCartStore((state) => state.removeItem);
  const handleRemoveItem = (product: Product) => {
    if (product) {
      removeItem(product);
      toast.success(`Removed ${product.title} from Cart`);
    }
  };
  return (
    <>
      <div className="flex gap-4 py-6">
        <div className="w-24 h-24 rounded-md overflow-hidden border border-gray-200 flex-shrink-0 flex justify-center items-center p-1">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-wrap justify-between items-center font-semibold">
            <h3 className="m-0 text-gray-900 ">{title}</h3>
            <p>${quantity * price}</p>
          </div>
          <div className="flex items-center gap-2">
            <CustomNumberInput product={product} />
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-gray-500">Quantity:{quantity}</p>
            <button
              type="button"
              aria-label="Remove Product"
              className="mb-auto ml-auto hover:text-red-700 transition-all active:scale-95"
              onClick={() => handleRemoveItem(product)}
            >
              <VisualOnlySvg>
                <PiTrash size={20} />
              </VisualOnlySvg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OffcanvasItem;
