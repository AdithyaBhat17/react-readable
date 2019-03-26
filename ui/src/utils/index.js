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

export const getAllPostsAPI = (category = undefined) => {
    if(category !== undefined) {
        return fetch(`${devURL}/${category}/posts`, getHeaders)
        .then(response => response.json())
    }    
    return fetch(`${devURL}/posts`, getHeaders)
    .then(response => response.json())
} 