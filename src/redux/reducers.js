import { combineReducers } from 'redux';
import { userReducer} from "./reducers/authReducers";


const rootReducer = combineReducers({
    userReducer
});

export default rootReducer;