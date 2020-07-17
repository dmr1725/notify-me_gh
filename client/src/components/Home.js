import React from 'react'
import {Link} from 'react-router-dom'


const Home = ()=>{
    return (
        <div>
            <div className="ui secondary pointing menu">
                <Link to="/"  className="item">
                    Home
                </Link>
                <Link to="/login" className="item">
                    Login
                </Link> 
            </div>
            <div className="ui message">
                <div className="header">
                    Welcome to Notify Me
                </div>
                <p>The purpose of this app is that users say if they're available to do appointments. Once available, appointments will be send to you</p>
            </div>
        </div>
    )
}

export default Home
