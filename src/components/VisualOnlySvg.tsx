import React from "react";
type VisualOnlySvgProps = {
  children: React.ReactNode;
  className?: string;
};

function VisualOnlySvg({ children, className }: VisualOnlySvgProps) {
  return (
    <span aria-hidden="true" className={className}>
      {children}
    </span>
  );
}

export default VisualOnlySvg;
