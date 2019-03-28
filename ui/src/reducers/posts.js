import {
    GET_POSTS,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST
} from '../actions/constants'

export const postsReducer = (state = [], action) => {
    switch(action.type) {
        case GET_POSTS: 
            return action.response
        case CREATE_POST: 
            return [
                ...state,
                action.response
            ]
        case DELETE_POST: 
            return state.filter(post => action.response.id !== post.id)
        case UPDATE_POST:
            return state.map(
                post => post.id === action.response.id ? action.response : post
            )
        default: 
            return state
    }
}