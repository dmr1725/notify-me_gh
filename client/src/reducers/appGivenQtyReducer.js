import {APPOINTMENTS_GIVEN_QTY} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case APPOINTMENTS_GIVEN_QTY:
            return action.payload

        default:
            return state
    }
}