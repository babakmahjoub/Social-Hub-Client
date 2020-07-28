import * as actions from '../types'


const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.SET_AUTHENICATED:
            return {
                ...state,
                authenticated: true
            }
        case actions.SET_UNAUTHENICATED:
            return initialState
        case actions.SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case actions.LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}