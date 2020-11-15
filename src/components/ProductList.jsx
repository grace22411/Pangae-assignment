/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import ProductItem from "./ProductItem";
import "../App.css";
import { PRODUCTS } from "../lib/queries";
import { useCartContext } from "../context/Cart";
import { useProductContext } from "../context/Products";
import SideDrawer from "./SideDrawer";

export const ProductList = () => {
  const { products, setProducts } = useProductContext();
  const { isOpen, setIsOpen } = useCartContext();

  const [fetchAllProducts, { loading, error, data }] = useLazyQuery(PRODUCTS);

  useEffect(() => {
    fetchAllProducts({
      variables: { currency: "USD" }
    });
  }, [fetchAllProducts]);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  if (!data || loading) return <p>Products Loading...</p>;

  if (error) return <p>Opps, there is an error</p>;

  return (
    <>
      {products &&
        products.map(product => (
          <ProductItem key={product.id} product={{ ...product }} />
        ))}
      <SideDrawer isOpen={isOpen} close={() => setIsOpen(false)} />
    </>
  );
};
