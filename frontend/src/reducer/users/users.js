const initialState = {
    users: [],
  };
  
  const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_USERS":
        return {
          ...state,
          users: payload,
        };
    //   case "ADD_USERS":
    //     return {
    //       ...state,
    //       products: [...state.products, payload],
    //     };
    //   case "UPDATE_USERS":
    //     return {
    //       ...state,
    //       products: state.products.map((element) => {
    //         if (payload.id === element.id) return payload;
    //         return element;
    //       }),
    //     };
      case "DELETE_USERS":
        return {
          ...state,
          users: state.users.filter((element) => {
            return element.id != payload;
          }),
        };
  
      default:
        return state;
    }
  };
  
  export default usersReducer;
  
  // Actions:
  
  export const setusers = (users) => {
    return { type: "SET_USERS", payload: users };
  };
  
//   export const addproduct = (product) => {
//     return { type: "ADD_PRODUCT", payload: product };
//   };
  
//   export const updateproductById = (updatedProduct) => {
//     return { type: "UPDATE_PRODUCT", payload: updatedProduct };
//   };
  
  export const deleteUserById = (id) => {
    return { type: "DELETE_USER", payload: id };
  };
  