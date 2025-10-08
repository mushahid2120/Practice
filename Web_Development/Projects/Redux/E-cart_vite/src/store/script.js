
import productReducer from "./Slice/productReducer";
import WishlistReducer from "./Slice/wishlistReducer";
import CartSlice from "./Slice/cartSlice";
import { configureStore } from "@reduxjs/toolkit";




const store=configureStore({
  reducer:{
    product: productReducer,
  wishList: WishlistReducer,
  cartList: CartSlice,
  }
})


store.subscribe(() => {
  console.log(store.getState());
});


export default store;
