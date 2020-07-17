import {SALES_QTY} from '../actions/types'

// updating state in redux store
export default(state = null, action)=>{
    switch(action.type){
        case SALES_QTY:
            return action.payload

        default:
            return state
    }
}