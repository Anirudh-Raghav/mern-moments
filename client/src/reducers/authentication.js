import REDUCERS_CONSTANTS from "../constants/reducers";

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case REDUCERS_CONSTANTS.AUTH:
            localStorage.setItem('login', JSON.stringify({ ...action?.data }))

            return { ...state, authData: action.data, loading: false, errors: null }

        case REDUCERS_CONSTANTS.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null, loading: false, errors: null }

        default:
            return state;
    }
}


export default authReducer;