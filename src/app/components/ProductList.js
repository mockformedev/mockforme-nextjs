"use client";

import { AddToCart } from "./AddToCart";
import { Button } from "./Button";
import { useEffect, useState } from "react";

export function ProductList({ initialData }) {

  const [products, setProducts] = useState(initialData || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (initialData?.length) {
      setProducts(initialData);
    }
  }, [initialData]);

  async function handleLoadMore() {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`https://www.myexample.com/products?page=${nextPage}`, {
        cache: "no-store",
      });
      const newData = await res.json();

      setProducts((prev) => [...prev, ...newData]);
      setPage(nextPage);
    } catch (err) {
      console.log("<err>", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="products-container">
      <h1 className="main-heading text-center mb-5 mt-5 bg-primary">
        Product page from SSR
      </h1>
      <div className="center text-lg py-8">
        <a href="/docs">Check Documentation</a> &nbsp;|&nbsp;
        <a href="https://github.com/mockformedev/mockforme-nextjs" target="_blank">GitHub</a> &nbsp;|&nbsp;
        <a href="https://dashboard.mockforme.com" target="_blank">Create Mock Api</a>
      </div>
      <div className="products">
        {products?.map((product, index) => (
          <div className="product" key={index}>
            <div className="img-container">
              <img className="img" src={product.image} />
            </div>
            <h2>{product.name}</h2>
            <div className="price">${product.price}</div>

            <AddToCart product={product} quantity={1} />
          </div>
        ))}
      </div>

      <div className="center mt-5 mb-50">
        <Button onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </Button>
      </div>
    </div>
  );
}