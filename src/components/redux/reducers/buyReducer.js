import {SELECT_MENU, SET_CUSTOMER} from '../actions/buyAction';

const initialState = {
    id: '',
    customer: '',
    name: '',
    image: '',
    price: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_MENU:
            const new_item = {...state, 
                id: action.payload.id,
                name: action.payload.name,
                image: action.payload.image,
                price: action.payload.price
            }
            return new_item
        case SET_CUSTOMER:
            const new_customer = {...state,
                customer: action.payload
            }
            return new_customer
        default:
            return state
    }
}

export default reducer