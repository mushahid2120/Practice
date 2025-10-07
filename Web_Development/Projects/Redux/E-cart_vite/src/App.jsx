import Product from './Components/Product'
import {useSelector} from 'react-redux'
import './App.css'

function App() {
    const productList = useSelector((state)=>state.product)
  return (
   <main className='productContainer'>
           {productList.map(({id,title,price,rating,images})=>(
                   <Product 
                   key={id}
                       id={id}
                       title={title}
                       price={price}
                       rating={rating}
                       images={images}
                       />
               ))}
       </main>
  )
}

export default App
