export const LOGGED_IN = 'LOGGED_IN'

export const setAuth = (val) => {
    return {
        type: LOGGED_IN,
        payload: val
    }
}