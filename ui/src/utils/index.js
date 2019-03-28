const header = 'react-readable'

const devURL = 'http://localhost:3001'
const prodURL = 'https://react-readable-api.now.sh'

const getHeaders = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Authorization": header
    }
}

const postHeaders = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Authorization": header
    }
}

const putHeaders = {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json",
        "Authorization": header
    }
}

const deleteHeaders = {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
        "Authorization": header
    }
}

export const generateId = () => {
    let id = (Math.random() + 1).toString(36).substring(2)
    return id
}

export const getAllPostsAPI = (category = undefined) => {
    if(category !== undefined) {
        return fetch(`${devURL}/${category}/posts`, getHeaders)
        .then(response => response.json())
    }    
    return fetch(`${devURL}/posts`, getHeaders)
    .then(response => response.json())
} 

export const getCategoriesAPI = () => {
    return fetch(`${devURL}/categories`, getHeaders)
    .then(response => response.json())
}

export const getPostAPI = (id) => {  
    console.log(id)  
    return fetch(`${devURL}/posts/${id}`, getHeaders)
    .then(response => response.json())
}

export const createPostAPI = (body) => {
    postHeaders.body = JSON.stringify(body)
    return fetch(`${devURL}/posts`, postHeaders)
    .then(response => response.json())
}

export const votePostAPI = (id, option) => {
    postHeaders.body = JSON.stringify({option})
    return fetch(`${devURL}/posts/${id}`, postHeaders)
    .then(response => response.json())
}

export const editPostAPI = (id, body) => {
    putHeaders.body = JSON.stringify(body)
    return fetch(`${devURL}/posts/${id}`, putHeaders)
    .then(response => response.json())
}

export const deletePostAPI = (id) => {
    return fetch(`${devURL}/posts/${id}`, deleteHeaders)
    .then(response => response.json())
}

export const getCommentsAPI = (id) => {
    return fetch(`${devURL}/posts/${id}/comments`, getHeaders)
    .then(response => response.json())
}

export const addCommentAPI = (body) => {
    postHeaders.body = JSON.stringify(body)
    return fetch(`${devURL}/comments`, postHeaders)
    .then(response => response.json())
}

export const getCommentAPI = (id) => {
    return fetch(`${devURL}/comments/${id}`, getHeaders)
    .then(response => response.json())
}

export const voteCommentAPI = (id, option) => {
    postHeaders.body = JSON.stringify(option)
    return fetch(`${devURL}/comments/${id}`, postHeaders)
    .then(response => response.json())
}

export const updateCommentAPI = (id, body) => {
    putHeaders.body = JSON.stringify(body)
    return fetch(`${devURL}/comments/${id}`, putHeaders)
    .then(response => response.json())
}

export const deleteCommentAPI = (id) => {
    return fetch(`${devURL}/comments/${id}`, deleteHeaders)
    .then(response => response.json())
}
