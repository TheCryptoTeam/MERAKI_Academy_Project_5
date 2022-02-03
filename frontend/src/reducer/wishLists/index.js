const initialState = {
    wishLists: [],
  };
  
  const wishListsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_wISHLISTS":
        return {
          ...state,
          wishLists: payload,
        };
      case "ADD_wISHLIST":
        return {
          ...state,
          wishLists: [...state.wishLists, payload],
        };
  
      default:
        return state;
    }
  };
  export default wishListsReducer;
  
  //Action
  
  export const setWishLists = (wishLists) => {
    return { type: "SET_wISHLISTS", payload: wishLists };
  };
  
  export const addWishList = (wishList) => {
    return { type: "ADD_wISHLIST", payload: wishList };
  };