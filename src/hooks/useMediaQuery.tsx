import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query);

		const queryListener = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		mediaQueryList.addEventListener("change", queryListener);

		return () => {
			mediaQueryList.removeEventListener("change", queryListener);
		};
	}, [query]);

	return matches;
};

export default useMediaQuery;
