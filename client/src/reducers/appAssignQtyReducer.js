import {APPOINTMENTS_ASSIGNED_QTY} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case APPOINTMENTS_ASSIGNED_QTY:
            return action.payload

        default:
            return state
    }
}