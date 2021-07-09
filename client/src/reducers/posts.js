import REDUCERS_CONSTANTS from "../constants/reducers";

const postReducer = (posts = [], action) => {
    switch (action.type) {
        case REDUCERS_CONSTANTS.FETCH:
            return action.payload;
        case REDUCERS_CONSTANTS.CREATE:
            return [...posts, action.payload];
        case REDUCERS_CONSTANTS.UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case REDUCERS_CONSTANTS.LIKE:
            console.log(action.payload);
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case REDUCERS_CONSTANTS.DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}


export default postReducer