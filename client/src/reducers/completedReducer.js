import {COMPLETED} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case COMPLETED:
            return action.payload

        default:
            return state
    }
}