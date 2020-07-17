import {TODAY} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case TODAY:
            return action.payload

        default:
            return state
    }
}