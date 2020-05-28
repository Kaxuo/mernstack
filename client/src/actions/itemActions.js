import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from './types'
import axios from 'axios'
 // after everything done, we just bring in the tokenHandler
import {tokenConfig} from './authActions'
import {returnErrors} from './errorActions'


// after installing axios, we will get info from backend , so now we can add dispatch and use thunk
export const getItems = () =>  dispatch => {
    // this return is going to reducer and get action.type , sending the types, it's going to return all the items 
    dispatch(setItemsLoading())
    // thanks to proxy in package.json we can just add this , not needing localhost
    axios.get('api/items').then(res => dispatch({
        type:GET_ITEMS,
        payload:res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data,err.response.status)))
}

// export const addItem = item  => {
//     return {
//         type:ADD_ITEM,
//         payload:item
//     }
// }

export const addItem = item => async (dispatch,getState) => {
    // dont forget to add the item as a second parameter ///// AND THEN WE ADDED TOKENCONFIG AT THE END , just pass in the token now 
    axios.post('api/items', item, tokenConfig(getState)).then(res => dispatch({
        type: ADD_ITEM,
        // res data can be seen in item.js in api , in the backend
        payload:res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data,err.response.status)))
}

export const deleteItem = id => async (dispatch,getState) => {
    // delete needs an id , so we have to send a payload to the reducer
    axios.delete(`/api/items/${id}`,tokenConfig(getState)).then(res => dispatch({
        type: DELETE_ITEM,
        // res data can be seen in item.js in api , in the backend
        payload:id
    }))
    .catch(err => dispatch(returnErrors(err.response.data,err.response.status)))
}

export const setItemsLoading = () => {
    return {
        type:ITEMS_LOADING
    }
}


export default {
    getItems,
    deleteItem,
    addItem,
}