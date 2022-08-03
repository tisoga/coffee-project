import { SET_ORDER_LIST } from "../actions/orderAction"

const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_LIST:
            return action.payload
        default:
            return state
    }
}

export default reducer