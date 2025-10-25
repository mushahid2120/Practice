import {useDispatch} from 'react-redux'
import { addCartItem } from '../store/Slice/cartSlice';

export default function ProductCard({id, title, price, rating, image}) {
  const dispatch=useDispatch()
  
  return (
    <div className="productCard">
      <img
        className="productImg"
        src={image}
        alt=""
      />
      <div className="productDetail">
        <h3 className="productName">{title}</h3>
        <div className="productRatingPrice">
          <p className="productRating">{rating.rate}</p>
          <p className="productPrice">${price}</p>
        </div>
        <div className="addToCardBuyNow">
          <button className="product-button"
            onClick={()=>{
                dispatch(addCartItem({id,quantity:1}))
            }}
          >Add to Card</button>
          <button className="product-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
