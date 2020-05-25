import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from './types'
import axios from 'axios'


// after installing axios, we will get info from backend , so now we can add dispatch and use thunk
export const getItems = () =>  dispatch => {
    // this return is going to reducer and get action.type , sending the types, it's going to return all the items 
    dispatch(setItemsLoading())
    // thanks to proxy in package.json we can just add this , not needing localhost
    axios.get('http://localhost:5000/api/items').then(res => dispatch({
        type:GET_ITEMS,
        payload:res.data
    }))
}

// export const addItem = item  => {
//     return {
//         type:ADD_ITEM,
//         payload:item
//     }
// }

export const addItem = item => async dispatch => {
    // dont forget to add the item as a second parameter
    axios.post('http://localhost:5000/api/items', item).then(res => dispatch({
        type: ADD_ITEM,
        // res data can be seen in item.js in api , in the backend
        payload:res.data
    }))
}

export const deleteItem = id => async dispatch => {
    // delete needs an id , so we have to send a payload to the reducer
    axios.delete(`http://localhost:5000/api/items/${id}`).then(res => dispatch({
        type: DELETE_ITEM,
        // res data can be seen in item.js in api , in the backend
        payload:id
    }))
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