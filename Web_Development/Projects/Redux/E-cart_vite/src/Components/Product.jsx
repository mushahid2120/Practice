import React from "react";

export default function ProductCard({id, title, price, rating, images}) {
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
          <button>Add to Card</button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
