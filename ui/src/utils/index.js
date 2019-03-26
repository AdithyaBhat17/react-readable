const header = 'react-readable'

const devURL = 'http://localhost:3001'
const prodURL = 'https://react-readable.now.sh'

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