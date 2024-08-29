import { useEffect, useRef } from "react";

export const useClickOutside = (cb: () => void) => {
	const ref = useRef<HTMLElement>(null);
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			const clickedEl = e.target as Node;
			if (ref.current && clickedEl.contains(ref.current)) {
				// you clicked outside
				cb();
			}
		};
		window.addEventListener("click", handler);

		return () => window.removeEventListener("click", handler);
	}, [cb]);
	return ref;
};
