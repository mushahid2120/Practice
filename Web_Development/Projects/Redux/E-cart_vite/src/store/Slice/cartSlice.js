import {createSlice}  from '@reduxjs/toolkit'

const findItemIndex=(state,action)=>(state.findIndex((cartItem)=>cartItem.id===action.payload.id))

const cartSlice=createSlice({
  name:'cart',
  initialState:[],
  reducers:{
    addCartItem(state,action){
      const existingItemIndex=findItemIndex(state,action)
      if(existingItemIndex!==-1)
          state[existingItemIndex].quantity+=1
        else
          state.push(action.payload)
    },
    removeCartItem(state,action){
      const existingItemIndex=findItemIndex(state,action)
      state.splice(existingItemIndex,1)
    },
    increaseCartItem(state,action){
      const existingItemIndex=findItemIndex(state,action)
      state[existingItemIndex].quantity+=1
    },
    decreaseCartItem(state,action){
      const existingItemIndex=findItemIndex(state,action)
      state[existingItemIndex].quantity-=1;
        if(state[existingItemIndex].quantity===0)
          state.splice(existingItemIndex,1)
    }
  }
})


export const {addCartItem,removeCartItem,increaseCartItem,decreaseCartItem}=cartSlice.actions


export default cartSlice.reducer;