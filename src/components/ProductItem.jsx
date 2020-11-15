import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/Cart";
import AddToCart from "./AddToCart";

export default function ProductItem({ product }) {
  const { id, title, image_url, price } = product;
  const { currency } = useCartContext();
  const [currencySign, setCurrencySign] = useState();

  useEffect(() => {
    const price_icon = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency
    }).format(price);
    setCurrencySign(price_icon);
  }, [currency, price]);

  return (
    <>
      <div className="head"></div>

      <div key={id} className="col-md-4" style={{ padding: "50px" }}>
        <div className="product-style">
          <div className="image">
            <img src={image_url} className="img-fluid" alt="Product" />
          </div>
          <h5>{title}</h5>
          <p>From: {currencySign} </p>
          <AddToCart product={product} />
        </div>
      </div>
    </>
  );
}
