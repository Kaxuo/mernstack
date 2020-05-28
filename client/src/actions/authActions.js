import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types'
import { returnErrors } from "./errorActions"
import axios from 'axios'


// Setup Config/headers and token //// !! 

export const tokenConfig = getState => {

    // get token from localstorage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json",
        }
    }

    // IF token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token
    }
    return config
}


// CHeck token & load user , in routes auth.js , CONSTANTLY     getstate =get certain part of the state ( here is the token)

export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });
    // below, after creating the function tokenconfig , we removed config below and replaced it with tokenconfig(getstate)
    axios.get('/api/auth/user', tokenConfig(getState)).then(res => dispatch({
        type: USER_LOADED,
        // Payload : user AND the token
        payload: res.data
    }))
        .catch(err => {
            // Error actions/reducers , we dont need ID
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: AUTH_ERROR })
        })
}



// Register User

export const register = ({name,email,password}) => dispatch =>  {
    const config = {
        headers : {
            'Content-Type' : "application/json"
        }
    }
    // Request Body , data that will be sent , object javascript turned into json
    const body = JSON.stringify({name,email,password})
    axios.post('/api/users' , body,config)
        .then(res => dispatch({
            type:REGISTER_SUCCESS,
            // User created , and sent payload to the reducer (everything will  be sent) (user data and token)
            payload:res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type:REGISTER_FAIL,
            })
        })
}


// Login User // , you copied almost everything from register
export const login = ({email,password}) => dispatch =>  {
    const config = {
        headers : {
            'Content-Type' : "application/json"
        }
    }
    // Request Body , data that will be sent , object javascript turned into json
    const body = JSON.stringify({email,password})
    axios.post('/api/auth' , body,config)
        .then(res => dispatch({
            type:LOGIN_SUCCESS,
            // User created , and sent payload to the reducer (everything will  be sent) (user data and token)
            payload:res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type:LOGIN_FAIL,
            })
        })
}

// logoutUser
export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    }
}


export default {
    loadUser,
    register,
    logout,
    login
}