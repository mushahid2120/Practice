import WishlistReducer from "./Slice/wishlistReducer";
import ProductSlice from "./Slice/productSlice";
import CartSlice from "./Slice/cartSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
  reducer: {
    productList: ProductSlice,
    wishList: WishlistReducer,
    cartList: CartSlice,
  },
  middleware: (defaultMiddleware)=>[...defaultMiddleware()]
});

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
