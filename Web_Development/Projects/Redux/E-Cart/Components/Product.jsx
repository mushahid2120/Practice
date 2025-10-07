import React from 'react'
import ProductCard from './ProductCard'
import productData from '../store/productData.js'

export default function Product() {
    // console.log(productData.map(({id,title,price,rating,images})=>(
    //             <Product 
    //                 id={id}
    //                 title={title}
    //                 price={price}
    //                 rating={rating}
    //                 images={images}
    //                 />
    //         )))
  return (
    <main className='productContainer'>
        <Product/>
    </main>
  )
}
