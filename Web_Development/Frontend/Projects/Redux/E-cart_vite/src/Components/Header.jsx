import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProductDataAsync,
} from "../store/Slice/productSlice";
import {

  fetchCartItemAsync,
  getCartItem,
} from "../store/Slice/cartSlice";

export default function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    //  For Custom Api CALL
    // dispatch(isfetchLoading())
    // fetch('https://fakestoreapi.com/products').then((res)=>res.json())
    // .then((data)=>{
    //   dispatch(updateAllProducts(data))
    // }).catch((error)=>{
    //   dispatch(isfetchError())
    // })

    // using API calling through Middleware
    // dispatch(fetchData({
    //   url: 'products',
    //   onStart: isfetchLoading.type,
    //   onSuccess: updateAllProducts.type,
    //   onError: isfetchError.type
    // }))

    //  For Custom Api CALL
    // fetch('https://fakestoreapi.com/carts/2').then((res)=>res.json())
    // .then((data)=>{
    //   const {productId:id,quantity}=data.products[0];
    //   dispatch(addCartItem({id,quantity}))
    // }).catch((error)=>console.log(error))

    // using API calling through Middleware
    // dispatch(fetchData({
    //   url: 'carts/2',
    //   onStart: isfetchLoadingCart.type,
    //   onSuccess: updateAllCart.type,
    //   onError: isfetchErrorCart.type
    // }))

    dispatch(fetchProductDataAsync());
    dispatch(fetchCartItemAsync());
  }, []);

  const cartItem = useSelector(getCartItem);
  return (
    <header>
      <Link to="/">
        <h2>Store</h2>
      </Link>
      <Link to="/cart">
        <div className="cartIcon">
          <p className="no-of-item">
            {cartItem.reduce((acc, curr) => acc + curr.quantity, 0)}
          </p>
          <FaShoppingCart size={26} />
        </div>
      </Link>
    </header>
  );
}
