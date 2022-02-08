
const initialState = {
  carts: [],
};

const cartsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CARTS":
      return {
        ...state,
        carts: payload,
      };
    case "ADD_CART":
      return {
        ...state,
        carts: [...state.carts, payload],
      };
      case "UPDATE_Cart":
      return {
        ...state,
        carts: state.carts.map((element) => {
          if (payload.id === element.id) return payload;
          return element;
        }),
      };
      case  "DELETE_CART":
          return{
            ...state,
            carts: state.carts.filter((element) => {
              return element.id !== payload;
            }),
          }

    default:
      return state;
  }
};
export default cartsReducer;

//Action

export const setcarts = (carts) => {
  return { type: "SET_CARTS", payload: carts };
};

export const addcart = (cart) => {
  return { type: "ADD_CART", payload: cart };
};
export const deleteCartstById = (id) => {
  return { type: "DELETE_CART", payload: id };
};
export const updateCarttById = (updatedCart) => {
  return { type: "UPDATE_Cart", payload: updatedCart };
};
