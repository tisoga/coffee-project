export const ADDFAVORITE = 'ADDFAVORITE';
export const REMOVEFAVORITE = 'REMOVEFAVORITE';

export const addFavorite = (val) => {
    return {
        type: ADDFAVORITE,
        payload: val
    }
}

export const removeFavorite = (val) => {
    return {
        type: REMOVEFAVORITE,
        payload: val
    }
}