import {
    GET_POSTS,
    GET_POSTS_FAILED
} from '../actions/constants'

const initialState = {
    posts: [],
    errorMessage: null
}

export const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POSTS: 
            return {
                ...state,
                posts: action.response
            }
        case GET_POSTS_FAILED: 
            return {
                ...state,
                errorMessage: action.error
            }
        default: 
            return state
    }
}