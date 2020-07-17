import {combineReducers} from 'redux'
import signInReducer from './signInReducer'
import appAssignQtyReducer from './appAssignQtyReducer'
import appGivenQtyReducer from './appGivenQtyReducer'
import salesQtyReducer from './salesQtyReducer'
import recentSalesReducer from './recentSalesReducer'
import checkAvailableReducer from './checkAvailableReducer'
import todayReducer from './todayReducer'
import demoGivenReducer from './demoGivenReducer'
import completedReducer from './completedReducer'
import makeSaleReducer from './makeSaleReducer'
import reScheduleReducer from './reScheduleReducer'
import notGivenReducer from './notGivenReducer'
import salesReducer from './salesReducer'
import deleteSaleReducer from './deleteSaleReducer'


export default combineReducers({
    signInReducer,
    appAssignQtyReducer,
    appGivenQtyReducer,
    salesQtyReducer,
    recentSalesReducer,
    checkAvailableReducer,
    todayReducer,
    demoGivenReducer,
    completedReducer,
    makeSaleReducer,
    reScheduleReducer,
    notGivenReducer,
    salesReducer,
    deleteSaleReducer
    
})