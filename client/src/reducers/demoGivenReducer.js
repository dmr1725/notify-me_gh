import {DEMO_GIVEN} from '../actions/types'

export default(state = null, action)=>{
    switch(action.type){
        case DEMO_GIVEN:
            return action.payload

        default:
            return state
    }
}