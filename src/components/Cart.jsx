import { useEffect, useState } from "react";
import { useCartContext } from "../context/Cart";
import useCart from "../hooks/useCart";
import CartItem from "./CartItem";
import Currencies from "./Currencies";

export default function Cart(props) {
  const { cart, currency } = useCartContext();
  const [totalPrice, setTotalPrice] = useState();
  const { getTotalPrice } = useCart();

  const getCurrency = (currency, price) => {
    const price_icon = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency
    }).format(price);
    return price_icon;
  };

  useEffect(() => {
    if (cart) {
      const subTotal = getTotalPrice();
      setTotalPrice(subTotal);
    }
  }, [cart, getTotalPrice]);
  return (
    <>
      {cart && (
        <>
          {cart.length > 0 && (
            <>
              <Currencies />
              {cart.map((item, idx) => (
                <CartItem item={item} key={item.id} />
              ))}
              <h3>Sub Total: {getCurrency(currency, totalPrice)}</h3>
            </>
          )}
          {cart.length < 1 && <p>Cart is empty</p>}
        </>
      )}
    </>
  );
}
