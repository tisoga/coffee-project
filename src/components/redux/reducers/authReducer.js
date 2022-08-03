import { LOGGED_IN } from '../actions/authAction';

const initialState = false


const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGGED_IN:
            return action.payload
        default:
            return state
    }
}

export default reducer