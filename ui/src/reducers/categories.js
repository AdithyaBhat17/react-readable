import {
    GET_CATEGORIES,
} from '../actions/constants'

export const categoriesReducer = (state = [], action) => {
    switch(action.type) {
        case GET_CATEGORIES: 
            return action.response.categories
        default:
            return state
    }
}