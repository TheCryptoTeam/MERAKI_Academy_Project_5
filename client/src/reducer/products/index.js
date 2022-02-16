const initialState = {
  products: [],
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, payload],
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((element) => {
          if (payload.id === element.id) return payload;
          return element;
        }),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((element) => {
          return element.id != payload;
        }),
      };

    default:
      return state;
  }
};

export default productsReducer;

// Actions:

export const setproducts = (products) => {
  return { type: "SET_PRODUCTS", payload: products };
};

export const addproduct = (product) => {
  return { type: "ADD_PRODUCT", payload: product };
};

export const updateproductById = (updatedProduct) => {
  return { type: "UPDATE_PRODUCT", payload: updatedProduct };
};

export const deleteProductById = (id) => {
  return { type: "DELETE_PRODUCT", payload: id };
};
