import { 
    GET_POSTS,
    GET_POSTS_FAILED,
    GET_CATEGORIES,
    GET_CATEGORIES_FAILED,
    GET_POST,
    GET_POST_FAILED,
    CREATE_POST,
    CREATE_POST_FAILED,
    VOTE_POST,
    VOTE_POST_FAILED,
    EDIT_POST,
    EDIT_POST_FAILED,
    DELETE_POST,
    DELETE_POST_FAILED,
    GET_COMMENTS,
    GET_COMMENTS_FAILED,
    ADD_COMMENT,
    ADD_COMMENT_FAILED,
    GET_COMMENT,
    GET_COMMENT_FAILED,
    VOTE_COMMENT,
    VOTE_COMMENT_FAILED,
    UPDATE_COMMENT,
    UPDATE_COMMENT_FAILED,
    DELETE_COMMENT,
    DELETE_COMMENT_FAILED
} from './constants'

import {
    getAllPostsAPI, 
    getCategoriesAPI, 
    createPostAPI, 
    getPostAPI,
    votePostAPI,
    editPostAPI,
    deletePostAPI,
    getCommentsAPI,
    addCommentAPI,
    getCommentAPI,
    voteCommentAPI,
    updateCommentAPI,
    deleteCommentAPI
} from '../utils'

export const getAllPosts = (category = undefined) => {
    return dispatch => {
        getAllPostsAPI(category)
        .then(response => dispatch({type: GET_POSTS, response}))
        .catch(error => dispatch({type: GET_POSTS_FAILED, error}))
    }
}

export const getCategories = () => {
    return dispatch => {
        getCategoriesAPI()
        .then(response => dispatch({type: GET_CATEGORIES, response}))
        .catch(error => dispatch({type: GET_CATEGORIES_FAILED, error}))
    }
}

export const getPost = (id) => {
    return dispatch => {
        getPostAPI(id)
        .then(response => dispatch({type: GET_POST, response}))
        .catch(error => dispatch({type: GET_POST_FAILED, error}))
    }
}

export const createPost = (body) => {
    return dispatch => {
        createPostAPI(body)
        .then(response => dispatch({type: CREATE_POST, response}))
        .catch(error => dispatch({type: CREATE_POST_FAILED, error}))
    }
}

export const votePost = (id, option) => {
    return dispatch => {
        votePostAPI(id, option)
        .then(response => dispatch({type: VOTE_POST, response}))
        .catch(error => dispatch({type: VOTE_POST_FAILED, error}))
    }
}

export const editPost = (id, body) => {
    return dispatch => {
        editPostAPI(id, body)
        .then(response => dispatch({type: EDIT_POST, response}))
        .catch(error => dispatch({type: EDIT_POST_FAILED, error}))
    }
}

export const deletePost = (id) => {
    return dispatch => {
        deletePostAPI(id)
        .then(response => dispatch({type: DELETE_POST, response}))
        .catch(error => dispatch({type: DELETE_POST_FAILED, error}))
    }
}

export const getAllComments = (id) => {
    return dispatch => {
        getCommentsAPI(id)
        .then(response => dispatch({type: GET_COMMENTS, response}))
        .catch(error => dispatch({type: GET_COMMENTS_FAILED, error}))
    }
}

export const addComment = (body) => {
    return dispatch => {
        addCommentAPI(body)
        .then(response => dispatch({type: ADD_COMMENT, response}))
        .catch(error => dispatch({type: ADD_COMMENT_FAILED, error}))
    }
}

export const getComment = (id) => {
    return dispatch => {
        getCommentAPI(id)
        .then(response => dispatch({type: GET_COMMENT, response}))
        .catch(error => dispatch({type: GET_COMMENT_FAILED, error}))
    }
}

export const voteComment = (id, option) => {
    return dispatch => {
        voteCommentAPI(id, option)
        .then(response => dispatch({type: VOTE_COMMENT, response}))
        .catch(error => dispatch({type: VOTE_COMMENT_FAILED, error}))
    }
}

export const updateComment = (id, body) => {
    return dispatch => {
        updateCommentAPI(id, body)
        .then(response => dispatch({type: UPDATE_COMMENT, response}))
        .catch(error => dispatch({type: UPDATE_COMMENT_FAILED, error}))
    }
}

export const deleteComment = (id) => {
    return dispatch => {
        deleteCommentAPI(id)
        .then(response => dispatch({type: DELETE_COMMENT, response}))
        .catch(error => dispatch({type: DELETE_COMMENT_FAILED, error}))
    }
}

