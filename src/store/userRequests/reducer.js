import * as types from "./actionTypes";

const initialState = {
  userRequests: [],
  userRequestIndex: 0,
};

export default function userRequests(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_USER_REQUESTS:
      return { ...state, userRequests: action.value };
    case types.UPDATE_USER_REQUEST:
      var userRequests = state.userRequests;
      userRequests[state.userRequestIndex] = action.value;
      return { ...state, userRequests: userRequests };
    case types.SELECT_USER_REQUEST:
      return { ...state, userRequestIndex: action.value };
    default:
      return state;
  }
}
