import {
  DEPOSIT_SUCCESS,
  UPGRADE_SUCCESS,
  WITHDRAW_SUCCESS,
} from "../constants/mpesa";

const initialState = {
  loading: true,
  depositData: null,
  upgradeData: null,
  withdrawData: null,
};

export const mpesa = (state = initialState, action) => {
  switch (action.type) {
    case DEPOSIT_SUCCESS:
      return { ...state, loading: false, depositData: action.payload };
    case UPGRADE_SUCCESS:
      return { ...state, loading: false, upgradeData: action.payload };
    case WITHDRAW_SUCCESS:
      return { ...state, loading: false, withdrawData: action.payload };
    default:
      return state;
  }
};
