// import { v4 as uuidv4 } from 'uuid';
import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from '../actions/types'


const initialState = {
    items : [],
    loading: false
}
// action = type attached to it (object)

export default function (state = initialState, action){
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                // we finally add all the items received
                items : action.payload,
                loading:false
            }
        case DELETE_ITEM:
            return {
                ...state,
                // we need to pass action.payload because of itemactions
                items: state.items.filter(item => item._id !== action.payload)
            }
        case ADD_ITEM:
            return {
                ...state,
                items : [...state.items,action.payload ]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading:true
            }
        default :
            return {
                ...state
            }
    }
}