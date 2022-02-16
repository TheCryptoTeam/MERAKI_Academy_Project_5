const initialState = {
    wishLists: [],
  };
  
  const wishListsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_WISHLISTS":
        return {
          ...state,
          wishLists: payload,
        };
      case "ADD_WISHLIST":
        return {
          ...state,
          wishLists: [...state.wishLists, payload],
        };
        case "DELETE_WISHLIST":
          return{
            ...state,
            wishLists: state.wishLists.filter((element) => {
              return element.id !== payload;
            }),
          }
  
      default:
        return state;
    }
  };
  export default wishListsReducer;
  
  //Action
  
  export const setWishLists = (wishLists) => {
    return { type: "SET_WISHLISTS", payload: wishLists };
  };
  
  export const addWishList = (wishList) => {
    return { type: "ADD_WISHLIST", payload: wishList };
  };
  export const deleteWishListById = (id) => {
    return { type: "DELETE_WISHLIST", payload: id };
  };
  