import { useCartContext } from "../context/Cart";
import useCart from "../hooks/useCart";

const CartItem = ({ item }) => {
  const { handleIncreaseQty, handleDecreaseQty } = useCart();
  const { currency } = useCartContext();

  const getCurrency = (currency, price) => {
    const price_icon = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency
    }).format(price);
    return price_icon;
  };

  return (
    <div className="add-item">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <p>{item.title}</p>
          </div>
          <div className="col-md-4">
            <p>{getCurrency(currency, item.price * item.qty)}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <p className="quantity">
              <i
                className="fas fa-minus"
                onClick={() => handleDecreaseQty(item.id)}></i>
              {item.qty}
              <i
                className="fas fa-plus"
                onClick={() => handleIncreaseQty(item.id)}></i>
            </p>
          </div>

          <div className="col-md-4">
            <div className="product-add-cart-image">
              <img
                src={item.image_url}
                width="50px"
                className="img-fluid"
                alt="product"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
