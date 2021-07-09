import REDUCERS_CONSTANTS from '../constants/reducers';
import * as api from '../api';

export const signIn = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        const dispatchableData = { type: REDUCERS_CONSTANTS.AUTH, data: data.data }
        dispatch(dispatchableData);

        router.push('/');
    } catch (error) {
        console.error(error);
    }
};

export const signUp = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: REDUCERS_CONSTANTS.AUTH, data: data.data });

        router.push('/');
    } catch (error) {
        console.error(error);
    }
};