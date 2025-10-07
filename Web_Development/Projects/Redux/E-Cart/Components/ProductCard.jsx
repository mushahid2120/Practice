import React from 'react'

export default function ProductCard() {
  return (
    <div className="productCard">
        <img className="productImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1yhlTpkCnujnhzP-xioiy9RdDQkKLMnMSg&s" alt="" />
        <div className='productDetail'>
            <h3 className='productName'>Product Name</h3>
            <div className='productRatingPrice'>
                <p className='productRating'>1.1</p>
                <p className='productPrice'>$22.3</p>
            </div>
            <div className="addToCardBuyNow">
                <button>Add to Card</button>
                <button>Buy Now</button>
            </div>
        </div>
    </div>
  )
}
