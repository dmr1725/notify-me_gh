import {INCOMPLETE} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case INCOMPLETE:
            return action.payload

        default:
            return state
    }
}