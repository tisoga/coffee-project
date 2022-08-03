import { combineReducers } from "redux";
import menuReducer from './menuReducer';
import favoriteReducer from './favoriteReducer';
import authReducer from './authReducer'
import buyReducer from './buyReducer'
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
    menuReducer,
    favoriteReducer,
    authReducer,
    buyReducer,
    orderReducer
})

export default rootReducer