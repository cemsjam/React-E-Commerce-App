import { Link } from "react-router-dom";

import { Product } from "@/types/Product";

type SuggestionsPropTypes = {
	products: Product[];
	onClick: () => void;
};

function Suggestions({ products, onClick }: SuggestionsPropTypes) {
	return (
		<>
			{products.map(({ id, title, price, thumbnail }: Product) => (
				<li key={id}>
					<Link
						onClick={onClick}
						to={`/product/${id}`}
						className="flex-1 min-[175px] flex gap-2 px-4 py-3 justify-center items-center text-center hover:bg-gray-100 cursor-pointer"
					>
						<img className="w-8 h-8" src={thumbnail} alt={title} width={40} height={40} />
						<span className="flex-1 whitespace-nowrap font-medium">{title}</span>
						<span className="text-black font-bold">${price}</span>
					</Link>
				</li>
			))}
		</>
	);
}

export default Suggestions;
