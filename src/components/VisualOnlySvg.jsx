import React from "react";

function VisualOnlySvg({ children, className }) {
  return (
    <span aria-hidden="true" className={className}>
      {children}
    </span>
  );
}

export default VisualOnlySvg;
