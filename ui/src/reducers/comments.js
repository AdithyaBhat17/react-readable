import { GET_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from "../actions/constants";


export const commentsReducer = (state = [], action) => {
    switch(action.type) {
        case GET_COMMENTS: 
            return action.response
        case ADD_COMMENT: 
            return [
                ...state,
                action.response
            ]
        case UPDATE_COMMENT: 
            return state.map(
                comment => action.response.id === comment.id ? action.response : comment
            )
        case DELETE_COMMENT:
            return state.filter(
                comment => comment.id !== action.response.id
            )
        default:
            return state
    }
}