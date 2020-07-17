import {CHECK_AVAILABLE} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case CHECK_AVAILABLE:
            return action.payload

        default:
            return state
    }
}