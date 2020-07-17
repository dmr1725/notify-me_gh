import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'
import AuthRoute from './route/AuthRoute'
import Disponible from './Disponible'
import Today from './Today'
import Completed from './Completed'
import Incomplete from './Incomplete'
import Sales from './Sales'
import MakeSale from './MakeSale'
import ReSchedule from './ReSchedule'




const App = ()=>{
    return (
        <div className="ui container">
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" exact component={Login}/>
                        <AuthRoute path="/user/dashboard" exact component={Dashboard}/>
                        <AuthRoute path="/user/disponible" exact component={Disponible}/>
                        <AuthRoute path="/user/today" exact component={Today}/>
                        <AuthRoute path="/user/completed" exact component={Completed}/>
                        <AuthRoute path="/user/incomplete" exact component={Incomplete}/>
                        <AuthRoute path="/user/sales" exact component={Sales}/>
                        <AuthRoute path="/user/makeSale/:id" exact component={MakeSale}/>
                        <AuthRoute path="/user/reSchedule/:id" exact component={ReSchedule}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App