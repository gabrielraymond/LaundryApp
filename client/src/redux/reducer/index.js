import { combineReducers } from "redux";
import auth from './auth';
import laundry from './laundry'

const allReducer = combineReducers({
    auth:auth,
    laundry:laundry
});

export default allReducer