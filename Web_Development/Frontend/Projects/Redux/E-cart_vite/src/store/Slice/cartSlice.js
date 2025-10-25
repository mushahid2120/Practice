import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.list.findIndex((cartItem) => cartItem.id === action.payload.id);

// export const fetchCartData=()=>(dispatch)=>{
//     dispatch(isfetchLoadingCart())
//     fetch('https://fakestoreapi.com/carts/2').then((res)=>res.json())
//     .then((data)=>{
//         dispatch(updateAllCart(data))
//     }).catch((error)=>{
//         dispatch(isfetchErrorCart())
//     })
// }

export const fetchCartItemAsync=createAsyncThunk(
  'cart/fetchCartItem',
  async()=>{
    try{
      const response=await fetch('https://fakestoreapi.com/carts/2')
      return response.json()
    }catch(error){
      throw error
    }
  }
)



const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: "",
    list: [],
    error: "",
  },
  reducers: {
    // isfetchLoadingCart(state) {
    //   state.loading = true;
    // },
    // isfetchErrorCart(state, action) {
    //   state.loading = false;
    //   state.error = action.payload || "SomeThing Went Wrong";
    // },
    // updateAllCart(state, action) {
    //   state.loading = false;
    //   const {productId:id,quantity} = action.payload.products[0];
    //   state.list.push({id,quantity})
    // },
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) state.list[existingItemIndex].quantity += 1;
      else state.list.push(action.payload);
    },
    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      state.list.splice(existingItemIndex, 1);
    },
    increaseCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      state.list[existingItemIndex].quantity += 1;
    },
    decreaseCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      state.list[existingItemIndex].quantity -= 1;
      if (state.list[existingItemIndex].quantity === 0)
        state.list.splice(existingItemIndex, 1);
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchCartItemAsync.fulfilled,(state,action)=>{
      console.log(action)
      const {productId:id,quantity} = action.payload.products[0];
      state.list.push({id,quantity})
    })
  }
});

export const getCartItem = (state) => state.cartList.list;
export const getCartItemList = ({ productList, cartList }) =>
  {
    return cartList.list.map(({ id, quantity }) => {
    const cartProduct = productList.list.find((product) => {
      return product.id === id;
    });
    return { ...cartProduct, quantity };
  })}

export const getAllcartItems = createSelector(
  getCartItemList,
  (cartItems) => [...cartItems]
);

export const {
  // isfetchLoadingCart,
  // isfetchErrorCart,
  // updateAllCart,
  addCartItem,
  removeCartItem,
  increaseCartItem,
  decreaseCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
