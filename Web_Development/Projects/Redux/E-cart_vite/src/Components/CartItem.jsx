import { useDispatch } from 'react-redux'
import { decreaseCartItem, increaseCartItem, removeCartItem } from '../store/Slice/cartSlice'

export default function CartItem({ id, title, price, images, quantity }) {
  const dispatch=useDispatch()
  return (
    <div className="cartItems-container">
            <div className="product-img-title">
            <img src={images} alt="" />
            <div className="product-title">{title}</div>
            </div>
            <div>${price}</div>
            <div>
                <button className="cartButton" onClick={()=>{
                  dispatch(increaseCartItem({id}))
                }}>+</button> {quantity} <button className="cartButton"
                onClick={()=>{
                  dispatch(decreaseCartItem({id}))}}
                >-</button>
                <button className='cartButton' onClick={()=>{dispatch(removeCartItem({id}))}}>Delete</button>
            </div>

            <div>{quantity*price}</div>
    </div>
  )
}
