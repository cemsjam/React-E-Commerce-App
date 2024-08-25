import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/Product";

import Loader from "@/components/Loader";
import useDebounce from "@/hooks/useDebounce";
import VisualOnlySvg from "@/components/VisualOnlySvg";
import Suggestions from "@/components/layout/Header/SearchBar/Suggestions";

function SearchBar() {
	const [query, setQuery] = useState("");
	const debouncedValue = useDebounce(query, 500);
	const navigate = useNavigate();
	const [suggestions, setSuggestions] = useState<{ products: Product[] }>({ products: [] });
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(false);
	const [focused, setFocused] = useState(false);
	const searchContainerRef = useRef<HTMLDivElement | null>(null);

	//#region fetching search suggestions with a debounced value
	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await fetch(import.meta.env.VITE_APP_API_BASE_URL + `/search?q=${debouncedValue.toLowerCase()}`, {
					signal,
				});
				if (!res.ok) throw new Error("No response to this request in Search Component");

				const json = await res.json();

				if (json.products.length > 0) {
					if (json) {
						setSuggestions(json);
						setNotFound(false);
					}
				} else {
					setNotFound(true);
					setSuggestions({ products: [] });
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		if (debouncedValue !== "" && debouncedValue.length >= 3) {
			fetchData();
		} else {
			if (notFound) setNotFound(false);
			if (suggestions) setSuggestions({ products: [] });
		}
	}, [debouncedValue]);
	//#endregion

	//#region click outside will be replaced with a hook
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node;
			if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
				setFocused(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);
	//#endregion
	const onHandleSearchButtonClick = () => {
		if (debouncedValue.length >= 3 && suggestions.products.length > 0) {
			navigate(`/search?${new URLSearchParams({ q: debouncedValue })}`, {
				state: suggestions,
			});
		}
	};

	return (
		<div
			className={cn(
				"h-[40px] relative order-last md:order-none md:max-w-lg w-full border border-transparent z-40 isolate"
			)}
			ref={searchContainerRef}
		>
			<form className="relative z-50">
				<label className="sr-only" htmlFor="Search">
					Search Any Product Here!
				</label>
				<input
					className={cn(
						"h-[40px] w-full rounded-md border border-transparent py-1.5 pl-4 pr-[60px] placeholder:text-sm bg-neutral-100 font-medium placeholder:tracking-wide placeholder:font-medium placeholder:text-gray-500 focus:outline-none",
						{
							"border-primary": focused,
							"rounded-b-none": debouncedValue.length >= 3,
						}
					)}
					name="search"
					id="Search"
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setFocused(true)}
					placeholder="Search Any Product Here!"
				/>
				<button
					type="button"
					aria-label="Visit Search Page"
					className="w-[40px] h-[40px] text-primary flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2"
					onClick={onHandleSearchButtonClick}
				>
					<VisualOnlySvg>
						<AiOutlineSearch size={20} />
					</VisualOnlySvg>
				</button>
			</form>
			<div
				className={cn("absolute top-full left-0 w-full bg-white -mt-[1px] ", {
					"z-40 overflow-hidden rounded-b-sm": focused,
				})}
			>
				{debouncedValue.length >= 3 && focused && (
					<ul
						className={cn("w-full flex flex-col", {
							"border border-primary border-t-transparent shadow-2xl rounded-b-sm overflow-hidden": focused,
						})}
					>
						{loading && <Loader />}
						{debouncedValue.length > 0 && suggestions?.products?.length > 0 && (
							<>
								<Suggestions products={suggestions?.products} onClick={() => setFocused(false)} />
								<li>
									<button
										type="button"
										onClick={() => {
											onHandleSearchButtonClick();
											setFocused(false);
										}}
										className="bg-primary text-white w-full px-4 py-3 text-center font-bold rounded-b-sm overflow-hidden hover:bg-primary-600"
									>
										Show All Search Results
									</button>
								</li>
							</>
						)}
						{notFound && !loading && <span className="p-2 h-8  text-red-600">Product Not found</span>}
					</ul>
				)}
			</div>
		</div>
	);
}

export default SearchBar;
