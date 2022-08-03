import { ADDFAVORITE, REMOVEFAVORITE } from '../actions/favoriteAction'

const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDFAVORITE:
            // state.push(action.payload)
            return action.payload
        case REMOVEFAVORITE:
            return action.payload
        default:
            return state
    }
}

export default reducer