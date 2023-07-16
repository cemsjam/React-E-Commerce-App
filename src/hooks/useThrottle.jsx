import { useRef, useEffect } from "react";

export default function useThrottled(fn, delay) {
  const timeoutRef = useRef(null);
  const shouldFireRef = useRef(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args) => {
    if (!timeoutRef.current) {
      fn(...args);
      shouldFireRef.current = true;
      timeoutRef.current = setTimeout(() => {
        if (shouldFireRef.current) {
          fn(...args);
          shouldFireRef.current = false;
        }
        timeoutRef.current = null;
      }, delay);
    } else {
      shouldFireRef.current = true;
    }
  };
}
