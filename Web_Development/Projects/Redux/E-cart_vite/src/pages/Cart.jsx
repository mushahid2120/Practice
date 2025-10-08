import { useSelector } from "react-redux";
import CartItem from "../Components/CartItem";

export default function Cart() {
  const cartItemList = useSelector((state) => state.cartList);
  return (
    <div className="cart-container">
      <h2 className="item-in-cart">Item in Your Cart</h2>
      <div className="cart-heading">
        <div className="item">Item</div>
        <div className="price">Price</div>
        <div className="quantity">Quantity </div>
        <div className="total">Total</div>
      </div>
      {cartItemList.map(({ id, title, price, rating, images, quantity }) => 
        (<CartItem
          key={id}
          id={id}
          title={title}
          price={price}
          rating={rating}
          images={images}
          quantity={quantity}
        />)
      )}
      <div className="total-amount">${cartItemList.reduce((acc,curr)=>acc+curr.quantity*curr.price,0).toFixed(2)}</div>
    </div>
  );
}
