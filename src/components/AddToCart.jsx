import React from "react";

import "antd/dist/antd.css";
import "../App.css";
import useCart from "../hooks/useCart";
import { useCartContext } from "../context/Cart";

function AddToCart({ product }) {
  const { add } = useCart();
  const { setIsOpen } = useCartContext();

  const showDrawer = e => {
    e.preventDefault();
    add(product);
    setIsOpen(true);
  };

  return (
    <div>
      <a className="add-cart-button" href="#!" onClick={showDrawer}>
        Add to Cart
      </a>
    </div>
  );
}

export default AddToCart;
