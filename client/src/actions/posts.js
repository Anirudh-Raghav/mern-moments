import * as api from '../api';
import REDUCERS_CONSTANTS from '../constants/reducers';

export const getAllPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: REDUCERS_CONSTANTS.FETCH, payload: data.data })
    }
    catch (err) {
        console.error(err)
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: REDUCERS_CONSTANTS.CREATE, payload: data.data });
    }
    catch (err) {
        console.error(err)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: REDUCERS_CONSTANTS.UPDATE, payload: data.data });
    } catch (err) {
        console.error(err)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: REDUCERS_CONSTANTS.DELETE, payload: id });
    }
    catch (err) {
        console.error(err)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: REDUCERS_CONSTANTS.LIKE, payload: data.data });
    }
    catch (err) {
        console.error(err);
    }
}