import {
  EDIT_USER,
  GET_USER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from "../constants/user";

const initialState = {
  loading: true,
  userData: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, loading: false, userData: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, userData: action.payload };
    case GET_USER_SUCCESS:
      return { ...state, loading: false, userData: action.payload };
    case EDIT_USER:
      return { ...state, loading: false, userData: action.payload };
    default:
      return state;
  }
};
