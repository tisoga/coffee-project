export const SETMENU = 'SETMENU';
export const RESETMENU = 'RESETMENU';

export const setMenu = (val) => {
    return {
        type: SETMENU,
        payload: val
    }
}

export const resetMenu = () => {
    return {
        type: RESETMENU,
    }
}