import {combineReducers,createStore} from 'redux'
import productReducer from './productReducer'
import wishlistReducer, { wishListAddItem, wishListRemoveItem, WISTLIST_ADD_ITEM, WISTLIST_REMOVE_ITEM } from './wishlistReducer'
import cartReducer, { CART_ADD_ITEM, CART_ITEM_DECREASE_QUANTITY, CART_ITEM_INCREASE_QUANTITY, CART_REMOVE_ITEM, cartAddItem, cartItemDecrease, cartItemIncrease, cartRemoveItem } from './cartReducer'

const reducer=combineReducers({
    product: productReducer,
    wishList: wishlistReducer,
    cartList: cartReducer
})

const store=createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__?.())

store.subscribe(()=>{
    console.log(store.getState())
})

// store.dispatch(cartAddItem(2))
// store.dispatch(cartAddItem(5))
// store.dispatch(cartRemoveItem(2))
// store.dispatch(cartItemIncrease(5))
// store.dispatch(cartItemDecrease(5))
// store.dispatch(cartItemDecrease(5))

// store.dispatch(wishListAddItem(3))
// store.dispatch(wishListAddItem(5))
// store.dispatch(wishListRemoveItem(3))

export default store;