import React from "react";
import useFetch from "@/hooks/useFetch";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import Loader from "@/components/Loader";
import { CategoryType } from "@/types/CategoryType";

function MainNavigation() {
  const { data, loading } = useFetch<CategoryType>(import.meta.env.VITE_APP_API_BASE_URL, "/categories");
  if (loading) return <Loader />;
  if (data) {
    return (
      <div className="border-b border-b-gray-200 hidden md:block">
        <nav role="navigation" aria-label="main" className="container">
          <ul className="flex">
            {data &&
              data.slice(0, 5).map((category) => (
                <li key={category}>
                  <NavLink to={`/category/${category}`}>
                    {({ isActive }) => (
                      <span
                        className={classNames(
                          "flex items-center px-2 h-10 capitalize font-semibold relative border-b transition-all",
                          {
                            "border-b-transparent hover:border-b-primary-400": !isActive,
                            "border-b-primary-700 text-primary": isActive,
                          }
                        )}
                      >
                        {category}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default MainNavigation;
