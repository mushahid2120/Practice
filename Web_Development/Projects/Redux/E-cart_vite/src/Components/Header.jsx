import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const cartItem=useSelector((state)=>state.cartList)
  return (
    <header>
      <Link to="/">
        <h2>Store</h2>
      </Link>
      <Link to="/cart">
        <div className="cartIcon">
          <p className="no-of-item">{cartItem.reduce((acc,curr)=>(acc+curr.quantity),0)}</p>
          <FaShoppingCart size={26} />
        </div>
      </Link>
    </header>
  );
}
