import { useCartContext } from "../context/Cart";
import { useProductContext } from "../context/Products";

const useCart = () => {
  const { cart, setCart } = useCartContext();
  const { products } = useProductContext();

  function add(product) {
    product.qty = 1;
    const cartIndex = cart.findIndex(el => el.id === product.id);
    if (cartIndex >= 0) {
      updateQuantity(cartIndex, "add");
    } else {
      setCart(current => [...current, product]);
    }
  }

  const updateQuantity = (productIndex, action) => {
    const newCart = [...cart];
    let newQty = 0;
    if (action === "add") {
      newQty = newCart[productIndex].qty + 1;
      newCart[productIndex] = { ...newCart[productIndex], qty: newQty };
    } else if (action === "remove" && newCart[productIndex].qty > 1) {
      newQty = newCart[productIndex].qty - 1;
      newCart[productIndex] = { ...newCart[productIndex], qty: newQty };
    } else if (action === "remove" && newCart[productIndex].qty === 1) {
      newCart.splice(productIndex, 1);
    }
    setCart(newCart);
  };

  const handleIncreaseQty = id => {
    const cartIndex = cart.findIndex(el => el.id === id);
    if (cartIndex > -1) {
      updateQuantity(cartIndex, "add");
    }
    getTotalPrice();
  };

  const handleDecreaseQty = id => {
    const cartIndex = cart.findIndex(el => el.id === id);
    if (cartIndex > -1) {
      updateQuantity(cartIndex, "remove");
    }
  };

  const updateProductPriceInCart = () => {
    // loop through the products array
    // check for the same product and update the object
    let newCartProducts = [...cart];
    products.forEach((product, idx) => {
      const cartProduct = cart.find(item => item.id === product.id);
      const cartProductIndex = cart.findIndex(item => item.id === product.id);
      if (cartProduct && cartProductIndex > -1) {
        newCartProducts[cartProductIndex] = {
          ...newCartProducts[cartProductIndex],
          price: product.price
        };
      }
    });
    setCart(newCartProducts);
  };

  const getTotalPrice = () => {
    let priceArr = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    for (let i = 0; i < cart.length; i++) {
      const productPrice = cart[i].price * cart[i].qty;
      priceArr.push(productPrice);
    }
    const totalPrice = priceArr.length > 0 && priceArr.reduce(reducer);
    return totalPrice;
  };

  return {
    handleIncreaseQty,
    handleDecreaseQty,
    add,
    updateProductPriceInCart,
    getTotalPrice
  };
};

export default useCart;
