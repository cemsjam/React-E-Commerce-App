import { useRef, useEffect } from "react";

type ThrottledFunction = (...args: any[]) => void;

export default function useThrottled(fn: ThrottledFunction, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldFireRef = useRef(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args: any[]) => {
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
