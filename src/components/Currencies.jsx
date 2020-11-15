/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useCartContext } from "../context/Cart";
import { useProductContext } from "../context/Products";
import useCart from "../hooks/useCart";
import { GET_CURRENCIES, PRODUCTS } from "../lib/queries";

export default function Currencies(props) {
  const [fetch, { data, loading, error }] = useLazyQuery(GET_CURRENCIES);
  const [
    fetchProducts,
    { data: productsData, loading: productsLoading }
  ] = useLazyQuery(PRODUCTS);
  const { currency, setCurrency } = useCartContext();
  const { setProducts, products } = useProductContext();
  const { updateProductPriceInCart } = useCart();

  const [curr, setCurr] = useState();

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData.products);
      setCurrency(curr);
    }
  }, [productsLoading, productsData]);

  useEffect(() => {
    if (productsData) {
      updateProductPriceInCart();
    }
  }, [products]);

  if (!data && error) {
    return <p>Error fetching currencies</p>;
  }

  if (!data || loading) {
    return <p>Loading...</p>;
  }

  const changeCurrency = async e => {
    const value = e.target.value;
    fetchProducts({
      variables: { currency: value }
    });
    setCurr(value);
  };

  return (
    <>
      <select onChange={changeCurrency}>
        <option value="">{currency}</option>
        {data &&
          data.currency.map((item, idx) => (
            <option value={item} key={idx}>
              {item}
            </option>
          ))}
      </select>
    </>
  );
}
