import { types } from "./actionTypes"

export const setError = ( err ) => {
    return{
        type: types.uiSetError,
        payload: err
    }
};

export const removeError = ( ) => (
    {
        type: types.uiRemoveError,
        payload: null
});

export const startLoading = () => {
    return {
        type: types.uiStartLoading,
    }
}

export const finishLoading = () => {
    return {
        type: types.uiFinishLoading,
    }
}

export const startLoadingDocumentsBar = () => {
    return {
        type: types.uiStartLoadingDocumentsBar,
    }
}

export const finishLoadingDocumentsBar = () => {
    return {
        type: types.uiFinishLoadingDocumentsBar,
    }
}

