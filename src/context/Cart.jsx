import { createContext, useState, useContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [totalPrice, setTotalPrice] = useState();

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        currency,
        setCurrency,
        isOpen,
        setIsOpen,
        totalPrice,
        setTotalPrice
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("cart context must be used in a CartProvider");
  }
  return context;
};

export default CartProvider;
