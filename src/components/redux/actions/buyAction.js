export const SELECT_MENU = 'SELECT_MENU';
export const SET_CUSTOMER = 'SET_CUSTOMER';

export const chooseMenu = (val) => {
    return{
        type: SELECT_MENU,
        payload: val
    }
}

export const setCustomer = (val) => {
    return{
        type: SET_CUSTOMER,
        payload: val
    }
}