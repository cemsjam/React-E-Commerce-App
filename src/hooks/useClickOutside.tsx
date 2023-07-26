import React, { useEffect } from "react";

type PassedFn = (e: MouseEvent) => void;

function useClickOutside(ref: React.RefObject<HTMLElement>, fn: PassedFn, isActive?: boolean) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const el = ref?.current;
      if (!el || el.contains(target)) {
        return;
      } else {
        fn(e);
      }
    };
    if (isActive) {
      document.addEventListener("click", handler, true);
    }

    return () => {
      if (isActive) {
        document.removeEventListener("click", handler, true);
      }
    };
  }, [ref.current, isActive]);
}

export default useClickOutside;
