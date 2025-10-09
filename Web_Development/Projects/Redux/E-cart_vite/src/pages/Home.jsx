import Product from "../Components/Product";
import { useSelector } from "react-redux";
import { getProductError, getProductIsLoading, getProductList } from "../store/Slice/productSlice";

function Home() {
  const productList = useSelector(getProductList);
  const isLoading = useSelector(getProductIsLoading);
  const error=useSelector(getProductError)
  return (
    <>
      <main className="productContainer">
        {isLoading ? (
          <h1 style={{textAlign: "center"}}>Loading Data....</h1>
        ) : ( 
            error ||
          productList.map(({ id, title, price, rating, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              rating={rating}
              image={image}
            />
          ))
        )}
      </main>
    </>
  );
}

export default Home;
