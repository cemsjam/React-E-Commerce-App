import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "@/hooks/useFetch";
import Card from "@/components/Card";
import Breadcrumb from "@/layout/Breadcrumb";

function Category() {
  const { categoryId } = useParams();
  const { data } = useFetch(import.meta.env.VITE_APP_API_BASE_URL, `/category/${categoryId}`);
  return (
    <div>
      <Breadcrumb />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.products?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Category;
