import {createRoot} from 'react-dom/client'
import { createElement } from 'react'
import './style.css'

const element=createElement('div',{},"hellwwo")
// console.log(element)

function Card({imgUrl,productName,brand,price}){
    return (
        <div className="card" >
            <img src={imgUrl} alt="" />
            <div className="card-content">
                <h3>{productName}</h3>
                <p>{brand}</p>
                <p><b>${price}</b></p>
            </div>
        </div>
    )
}



// fetch('https://dummyjson.com/products')
//     .then((res)=>res.json())
//         .then((product)=>{
//             console.log(product.products)
//             const allProduct=product.products.map((product)=>{
//                 console.log(product.id + '\n'+ product.images+ '\n'+product.title+ '\n'+product.price+ '\n'+product.brand)
//                 // return Card({
//                 //             key: product.id ,
//                 //             imgUrl: product.thumbnail,
//                 //             productName: product.title,
//                 //             brand:product.brand,
//                 //             price:product.price})

//                 return <Card
//                             key={product.id}
//                             imgUrl={product.thumbnail}
//                             productName={product.title}
//                             brand={product.brand}
//                             price={product.price}
//                         />
//             })
//             root.render(allProduct)
// })

const root=createRoot(document.querySelector('#root'))






