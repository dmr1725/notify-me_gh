import {SALES} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case SALES:
            return action.payload

        default:
            return state
    }
}