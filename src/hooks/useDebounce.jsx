import { useState, useEffect } from "react";

function useDebounce(val, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(val);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      setDebouncedValue(val);
    }, delay);
    return () => clearTimeout(timeoutID);
  }, [val, delay]);
  return debouncedValue;
}

export default useDebounce;
