import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { PiArrowRightLight } from "react-icons/pi";
import { GrFormClose } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

import { Product } from "@/types/Product";

import { useCartStore } from "@/stores/cartStore";
import { useOffcanvasStore } from "@/stores/offcanvasStore";
import useClickOutside from "@/hooks/useClickOutside";

import OffcanvasItem from "./OffcanvasItem";
import VisualOnlySvg from "../VisualOnlySvg";
import Button from "../Button";

const Offcanvas = React.forwardRef(
	({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }, ref: any) => {
		const { user } = useUser();
		const cartItems = useCartStore((state) => state.cartItems);
		const currentCart = user ? user.id : "default";
		const total = cartItems[currentCart]?.reduce(
			(acc, el) => Number(el.quantity * el.price + acc),
			0
		);
		const closeOffcanvas = useOffcanvasStore((state) => state.closeOffcanvas);

		const handleClickOutside = (e: MouseEvent) => {
			closeOffcanvas();
		};
		useClickOutside(ref, handleClickOutside, isOpen);
		return (
			<AnimatePresence>
				{isOpen && (
					<motion.div
						key={"offcanvas"}
						transition={{
							ease: "easeOut",
							duration: 0.2,
						}}
						initial={{ translateX: "100%" }}
						animate={{ translateX: 0 }}
						exit={{ translateX: "100%", opacity: 0 }}
						id="cart-offcanvas"
						ref={ref}
						className="fixed top-0 right-0 z-[110] bg-white shadow-2xl h-screen w-[80%] md:w-[350px] grid grid-rows-[auto,1fr,auto]
    } transition-transform"
					>
						{/* header */}
						<header className="font-semibold flex justify-between items-center w-full h-12 px-4 ">
							<h3 className="text-xl text-gray-900 m-0">Shopping Cart</h3>
							<Button
								variant="icon"
								onClick={onClick}
								className="text-gray-400"
								aria-label="Close Shopping Cart"
							>
								<VisualOnlySvg>
									<GrFormClose size={24} />
								</VisualOnlySvg>
							</Button>
						</header>
						{/* body */}
						<div className="p-4 pt-0 overflow-auto flex flex-col divide-y divide-gray-200">
							{cartItems[currentCart]?.length >= 1 ? (
								cartItems[currentCart]?.map((product) => (
									<OffcanvasItem key={product.id} product={product as Product} />
								))
							) : (
								<div className="w-full flex gap-2 items-center justify-center bg-sky-50 text-sky-800 font-semibold p-2 rounded-sm text-xs  m-auto">
									<VisualOnlySvg>
										<AiOutlineInfoCircle size={16} />
									</VisualOnlySvg>
									Your Shopping Cart Is Empty
								</div>
							)}
						</div>
						{/* cta */}
						<div className="flex flex-col">
							<div className="flex justify-between items-center p-4 mb-2 border-b border-b-gray-200 font-bold">
								<span>Subtotal: </span>
								<span className="text-primary">${total}</span>
							</div>
							<Button
								as={Link}
								variant="primary"
								buttonSize="lg"
								alignment="center"
								to="checkout-in-future"
								className="mx-4 mt-2"
							>
								Checkout
							</Button>
							<div className="m-4 flex justify-center gap-1 font-medium">
								or
								<Button
									type="button"
									variant="link"
									alignment="center"
									onClick={closeOffcanvas}
								>
									Continue shopping
									<VisualOnlySvg>
										<PiArrowRightLight size={14} />
									</VisualOnlySvg>
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		);
	}
);

export default Offcanvas;
