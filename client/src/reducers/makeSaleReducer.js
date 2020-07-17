import {MAKE_SALE} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case MAKE_SALE:
            return action.payload

        default:
            return state
    }
}