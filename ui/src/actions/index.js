import { 
    GET_POSTS,
    GET_CATEGORIES,
    CREATE_POST,
    UPDATE_POST,
    SORT_BY_VOTES,
    SORT_BY_TIME,
    DELETE_POST,
    GET_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT
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
    }
}

export const sortByVotes = (posts) => {
    return {
        type: SORT_BY_VOTES,
        posts
    }
}

export const sortByTime = (posts) => {
    return {
        type: SORT_BY_TIME,
        posts
    }
}

export const getCategories = () => {
    return dispatch => {
        getCategoriesAPI()
        .then(response => dispatch({type: GET_CATEGORIES, response}))
    }
}

export const getPost = (id) => {
    return dispatch => {
        getPostAPI(id)
        .then(response => dispatch({type: UPDATE_POST, response}))
    }
}

export const createPost = (body) => {
    return dispatch => {
        createPostAPI(body)
        .then(response => dispatch({type: CREATE_POST, response}))
    }
}

export const votePost = (id, option) => {
    return dispatch => {
        votePostAPI(id, option)
        .then(response => dispatch({type: UPDATE_POST, response}))
    }
}

export const editPost = (id, body) => {
    return dispatch => {
        editPostAPI(id, body)
        .then(response => dispatch({type: UPDATE_POST, response}))
    }
}

export const deletePost = (id) => {
    return dispatch => {
        deletePostAPI(id)
        .then(response => dispatch({type: DELETE_POST, response}))
    }
}

export const getAllComments = (id) => {
    return dispatch => {
        getCommentsAPI(id)
        .then(response => dispatch({type: GET_COMMENTS, response}))
    }
}

export const addComment = (body) => {
    return dispatch => {
        addCommentAPI(body)
        .then(response => dispatch({type: ADD_COMMENT, response}))
    }
}

export const getComment = (id) => {
    return dispatch => {
        getCommentAPI(id)
        .then(response => dispatch({type: UPDATE_COMMENT, response}))
    }
}

export const voteComment = (id, option) => {
    return dispatch => {
        voteCommentAPI(id, option)
        .then(response => dispatch({type: UPDATE_COMMENT, response}))
    }
}

export const updateComment = (id, body) => {
    return dispatch => {
        updateCommentAPI(id, body)
        .then(response => dispatch({type: UPDATE_COMMENT, response}))
    }
}

export const deleteComment = (id) => {
    return dispatch => {
        deleteCommentAPI(id)
        .then(response => dispatch({type: DELETE_COMMENT, response}))
    }
}

