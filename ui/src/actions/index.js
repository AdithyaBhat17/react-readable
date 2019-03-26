import { 
    GET_POSTS,
    GET_POSTS_FAILED
} from './constants'
import { getAllPostsAPI } from '../utils'

export const getAllPosts = (category = undefined) => {
    return dispatch => {
        getAllPostsAPI(category)
        .then(response => dispatch({type: GET_POSTS}, response))
        .catch(error => dispatch({type: GET_POSTS_FAILED, error}))
    }
}