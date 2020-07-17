import {RECENT_SALES} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case RECENT_SALES:
            return action.payload

        default:
            return state
    }
}