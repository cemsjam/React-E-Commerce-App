import React from "react";
import { Link, useMatches } from "react-router-dom";
interface RouteItem {
  handle?: {
    crumb?: boolean;
  };
  pathname: string;
}

function Breadcrumb() {
  const matches = useMatches() as RouteItem[];
  const crumbs = matches?.filter((route) => route?.handle?.crumb ?? []);
  // console.log(crumbs);
  return (
    <ol>
      {crumbs.map((item) => (
        <li key={item.pathname}>
          <Link to={item.pathname}>{item.pathname}</Link>
        </li>
      ))}
    </ol>
  );
}

export default Breadcrumb;
