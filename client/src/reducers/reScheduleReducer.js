import {RESCHEDULE} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case RESCHEDULE:
            return action.payload

        default:
            return state
    }
}