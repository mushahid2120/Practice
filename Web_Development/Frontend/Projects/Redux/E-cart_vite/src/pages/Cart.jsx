import { useSelector } from "react-redux";
import CartItem from "../Components/CartItem";
import { getAllcartItems, } from "../store/Slice/cartSlice";

export default function Cart() {
  const cartItems=useSelector(getAllcartItems)
  return (
    <div className="cart-container">
      <h2 className="item-in-cart">Item in Your Cart</h2>
      <div className="cart-heading">
        <div className="item">Item</div>
        <div className="price">Price</div>
        <div className="quantity">Quantity </div>
        <div className="total">Total</div>
      </div>
      {cartItems.map(({ id, title, price, image, quantity }) => 
        (<CartItem
          key={id}
          id={id}
          title={title}
          price={price} 
          images={image}
          quantity={quantity}
        />)
      )}
      <div className="total-amount">${cartItems.reduce((acc,curr)=>acc+curr.quantity*curr.price,0).toFixed(2)}</div>
    </div>
  );
}
