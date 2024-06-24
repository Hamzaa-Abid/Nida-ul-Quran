import * as types from "../Actions/Types";

const initialState = {
  data: {},
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SOCKET_INIT:
      console.log("REDUCER:: !!!, ", action.payload);
      return {
        ...state,
        data: action.payload ? action.payload : state.data,
      };

    default:
      return state;
  }
};

export default socketReducer;
