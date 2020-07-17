import React from 'react'
import {Link} from 'react-router-dom'
import Logout from './Logout'

const Header = ()=>{
    return (
        <div className="ui secondary pointing menu">
            <Link to="/user/dashboard"  className="item">
                Dashboard
            </Link>
            <Link to="/user/disponible"  className="item">
                Disponible
            </Link>
            <Link to="/user/today"  className="item">
                Today
            </Link>
            <Link to="/user/completed"  className="item">
                Completed
            </Link>
            <Link to="/user/incomplete"  className="item">
                Incomplete
            </Link>
            <Link to="/user/sales"  className="item">
                Sales
            </Link>
            <Logout/>
        </div>
    )
}

export default Header