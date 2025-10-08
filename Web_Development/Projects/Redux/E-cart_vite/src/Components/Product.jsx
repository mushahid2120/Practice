import {useDispatch} from 'react-redux'
import { addCartItem } from '../store/Slice/cartSlice';

export default function ProductCard({id, title, price, rating, images}) {
  const dispatch=useDispatch()
  
  return (
    <div className="productCard">
      <img
        className="productImg"
        src={images}
        alt=""
      />
      <div className="productDetail">
        <h3 className="productName">{title}</h3>
        <div className="productRatingPrice">
          <p className="productRating">{rating}</p>
          <p className="productPrice">${price}</p>
        </div>
        <div className="addToCardBuyNow">
          <button className="product-button"
            onClick={()=>{
                dispatch(addCartItem({id, title, price, rating, images,quantity:1}))
            }}
          >Add to Card</button>
          <button className="product-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
