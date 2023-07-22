import classNames from "classnames";
import { useState, useEffect } from "react";
import { BsArrowUp } from "react-icons/bs";
import useThrottle from "@/hooks/useThrottle";

function ScrollUp() {
  const [scrolledEnough, setScrolledEnough] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = useThrottle(() => {
    const scrollSpace = document.documentElement.offsetHeight - window.innerHeight;
    const currentScroll = document.documentElement.scrollTop;
    if (currentScroll > 200 && currentScroll <= scrollSpace) {
      setScrolledEnough(true);
    } else {
      setScrolledEnough(false);
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <button
      onClick={handleClick}
      type="button"
      aria-label="Scroll To Top"
      className={classNames(
        "fixed bottom-4 right-4 bg-indigo-700 text-white p-2 rounded-md pointer-events-auto scale-1 transition-all",
        {
          "scale-0 pointer-events-none ": !scrolledEnough,
        }
      )}
    >
      <BsArrowUp size={16} />
    </button>
  );
}

export default ScrollUp;
