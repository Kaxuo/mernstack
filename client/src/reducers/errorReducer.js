import {GET_ERRORS, CLEAR_ERRORS} from "../actions/types"

const initialState ={
    // Coming from server
    msg:{},
    status:null,
    // id if we want to grab a certain error and do something with it 
    id:null
}

export default function (state = initialState, action){
    switch (action.type){
        case GET_ERRORS:
            return {
                msg:action.payload.msg,
                status:action.payload.status,
                id:action.payload.id
            }
        case CLEAR_ERRORS:
            return{
                msg:{},
                status:null,
                id:null
            };
        default:
            return state
    }
}