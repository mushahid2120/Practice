export const WISTLIST_ADD_ITEM = "wishList/addItem";
export const WISTLIST_REMOVE_ITEM = "wishList/removeItem";

export function wishListAddItem(pId){
  return {type: WISTLIST_ADD_ITEM,payload: {productId: pId}}
}
export function wishListRemoveItem(pId){
  return {type: WISTLIST_REMOVE_ITEM,payload: {productId: pId}}
}

export default function WishlistReducer(state = [], action) {
  switch (action.type) {
    case WISTLIST_ADD_ITEM:
      return [...state, action.payload];
    case WISTLIST_REMOVE_ITEM:
      return state.filter(
        (wlItem) => (wlItem.productId !== action.payload.productId)
      );
    default:
      return state;
  }
}
