const initialState = {
 userRole:"1",
  token: localStorage.getItem("userToken") || "",
  isLoggedIn: localStorage.getItem("userToken") ? true : false,
};

// Reducer

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOG_IN":
      return {
        token: payload,
        isLoggedIn: true,
      };
    case "LOG_OUT":
      return {
        token: "",
        isLoggedIn: false,
      };
    case "ROLE":
      return {
        userRole: payload,
      };
    default:
      return state;
  }
};

export default loginReducer;

// Actions:

export const login = (token) => {
  return { type: "LOG_IN", payload: token };
};

export const role = (role) => {
  return { type: "ROLE", payload: role };
};
export const logout = () => {
  return { type: "LOG_OUT" };
};
