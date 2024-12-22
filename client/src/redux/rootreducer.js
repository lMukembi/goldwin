import { combineReducers } from "redux";
import { user } from "./queries/reducers/user";
import { mpesa } from "./queries/reducers/mpesa";

const rootReducer = combineReducers({
  user,
  mpesa,
});
export default rootReducer;
