import React, { createElement, memo } from "react";
import classNames from "classnames";

type ButtonProps = {
  as?: React.ReactNode | HTMLElement | React.ReactElement | string;
  children?: React.ReactNode;
  alignment?: string;
  fit?: string;
  buttonSize?: string;
  variant?: string;
  className?: string;
} & React.HTMLProps<HTMLElement>;

function Button({ as = "button", children, alignment, fit, buttonSize, variant, className, ...rest }: ButtonProps) {
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
        "p-3": buttonSize === "lg",
        "p-2": buttonSize === "md",
        "p-1": buttonSize === "sm",
        "font-semibold rounded-md bg-primary text-white hover:bg-primary-800 active:bg-primary-900":
          variant === "primary",
        "font-semibold rounded-md bg-gray-900 text-white hover:opacity-95 active:bg-gray-950": variant === "secondary",
        "font-semibold rounded-md border border-indigo-700 text-primary hover:bg-primary text-white active:bg-primary-800":
          variant === "outlined-primary",
        "font-semibold rounded-md border border-gray-900 text-gray-900 hover:bg-gray-900 text-white active:bg-gray-950":
          variant === "outlined-secondary",
        "text-primary-600": variant === "link",
        "font-semibold rounded-md bg-primary-50 text-primary hover:bg-primary-100 active:bg-primary-200":
          variant === "primary-subtle",
        "font-semibold rounded-md bg-gray-50 text-gray-900  hover:bg-gray-100 active:bg-gray-200":
          variant === "secondary-subtle",
        "hover:text-primary active:text-primary-800 transition-colors inline-flex justify-center items-center rounded-full":
          variant === "icon",
      }),
      ...rest,
    },
    children
  );
}

export default memo(Button);
