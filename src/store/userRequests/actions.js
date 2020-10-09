import * as types from './actionTypes';

export function updateUserRequests(value) {
  return dispatch => {
    dispatch({ type: types.UPDATE_USER_REQUESTS, value: value })
  }
}

export function updateUserRequest(value) {
  return dispatch => {
    dispatch({ type: types.UPDATE_USER_REQUEST, value: value })
  }
}

export function selectUserRequest(value) {
  return dispatch => {
    dispatch({ type: types.SELECT_USER_REQUEST, value: value })
  }
}