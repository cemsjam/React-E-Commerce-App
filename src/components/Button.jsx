import { createElement, memo } from "react";
import classNames from "classnames";

function Button({ as = "button", children, alignment, fit, size, variant, className, ...rest }) {
  return createElement(
    as,
    {
      className: classNames(`transition-all ${className ? className : ""}`, {
        "flex justify-center items-center gap-1": alignment === "center",
        "flex items-center gap-1": alignment === "initial",
        "flex justify-end items-center gap-1": alignment === "right",
        "w-fit": fit === "fit",
        "w-auto": fit === "auto",
        "w-full": fit === "full",
        "p-3": size === "lg",
        "p-2": size === "md",
        "p-1": size === "sm",
        "font-semibold rounded-md bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-900":
          variant === "primary",
        "font-semibold rounded-md bg-gray-900 text-white hover:opacity-95 active:bg-gray-950": variant === "secondary",
        "font-semibold rounded-md border border-indigo-700 text-indigo-700 hover:bg-indigo-700 text-white active:bg-indigo-800":
          variant === "outlined-primary",
        "font-semibold rounded-md border border-gray-900 text-gray-900 hover:bg-gray-900 text-white active:bg-gray-950":
          variant === "outlined-secondary",
        "text-indigo-600": variant === "link",
        "font-semibold rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 active:bg-indigo-200":
          variant === "primary-subtle",
        "font-semibold rounded-md bg-gray-50 text-gray-900  hover:bg-gray-100 active:bg-gray-200":
          variant === "secondary-subtle",
        "hover:text-indigo-700 active:text-indigo-800 transition-colors inline-flex justify-center items-center rounded-full":
          variant === "icon",
      }),
      ...rest,
    },
    children
  );
}

export default memo(Button);
