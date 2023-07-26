import { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { AiOutlineSearch } from "react-icons/ai";

import { Product } from "@/types/Product";

import Loader from "@/components/Loader";
import useDebounce from "@/hooks/useDebounce";
import VisualOnlySvg from "@/components/VisualOnlySvg";
import Suggestions from "./Suggestions";

function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query, 1000);
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
          if (notFound) setNotFound(true);
          if (json) {
            setSuggestions(json);
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
  return (
    <div
      className={classNames(
        "relative order-last md:order-none md:max-w-lg w-full border border-transparent z-40 isolate",
        {
          "shadow-2xl": focused,
        }
      )}
      ref={searchContainerRef}
    >
      <form className="relative z-50">
        <label className="sr-only" htmlFor="Search">
          Search Any Product Here!
        </label>
        <input
          className={classNames(
            "w-full border border-gray-100 bg-gray-100 py-1.5 px-3 placeholder:text-sm placeholder:tracking-wide placeholder:font-medium placeholder:text-gray-500 focus:outline-none",
            {
              "border-indigo-700": focused,
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
          type="submit"
          aria-label="Search Submit Button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-700"
        >
          <VisualOnlySvg>
            <AiOutlineSearch />
          </VisualOnlySvg>
        </button>
      </form>
      <div
        className={classNames("absolute top-full left-0 w-full bg-gray-100 -mt-[1px] ", {
          "z-40": focused,
        })}
      >
        {debouncedValue.length >= 3 && focused && (
          <ul
            className={classNames("w-full flex flex-wrap", {
              "border border-indigo-700 border-t-transparent shadow-2xl": focused,
            })}
          >
            {loading && debouncedValue && <Loader />}
            {suggestions?.products?.length > 0 && query.length > 0 && <Suggestions products={suggestions?.products} />}
            {notFound && <span className="p-2 h-8  text-red-600">Product Not found</span>}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
