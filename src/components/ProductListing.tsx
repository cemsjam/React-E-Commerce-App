import { motion } from "framer-motion";

import { Product } from "@/types/Product";

import usePagination from "@/hooks/usePagination";
import Card from "./Cards/Card";
import { InfiniteScroll } from "./InfiniteScroll";

//#region framer motion
const container = {
	visible: {
		transition: {
			staggerChildren: 0.8,
		},
	},
};

const item = {
	hidden: { opacity: 0, translateY: 20 },
	visible: {
		translateY: 0,
		opacity: 1,
	},
};
//#endregion

function ProductListing() {
	const { data, loading, buttons, changePage, page } = usePagination(
		import.meta.env.VITE_APP_API_BASE_URL,
		"",
		10
	); // baseurl + query + pagelimit
	const products = data?.products ?? [];
	return (
		<>
			<motion.ul
				variants={container}
				initial="hidden"
				animate="visible"
				className="product-listing grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
			>
				{loading
					? "...Loading"
					: products?.map((product: Product) => (
							<motion.li variants={item} key={product.id}>
								<Card product={product} />
							</motion.li>
					  ))}
			</motion.ul>

			<nav role="pagination" aria-label="Page Navigation">
				<ul className="flex justify-center gap-1 py-2">
					{buttons.map((btn) => (
						<li key={btn}>
							<button
								className={`${
									page === btn ? "bg-primary text-white font-bold" : ""
								} border border-gray-200 rounded-sm text-[0.6em] p-1`}
								type="button"
								aria-label={`Current page ${btn}`}
								aria-current={page === btn ? "true" : "false"}
								onClick={() => changePage(btn)}
							>
								{btn}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}

export default ProductListing;
