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

export const deleteUserById = (id) => {
  return { type: "DELETE_USER", payload: id };
};
