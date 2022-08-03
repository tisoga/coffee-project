import { SETMENU, RESETMENU } from '../actions/menuAction'

const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SETMENU:
            // console.log(action.payload.bestSales)
            state.push(action.payload)
            return state
        case RESETMENU:
            return []
        default:
            return state
    }
}

export default reducer