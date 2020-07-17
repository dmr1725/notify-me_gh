import {DELETE_SALE} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case DELETE_SALE:
            return action.payload

        default:
            return state
    }
}