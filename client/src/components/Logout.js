import React from 'react'
import {useHistory} from 'react-router-dom'


const Logout =()=>{
    let history = useHistory()


    return (
        <div className="right menu">
            <button className = "ui button negative"
                onClick={function(){
                    localStorage.removeItem('jwt')
                    history.push('/')
                }}
            >
                Logout
            </button>
        </div>
    )
}

export default Logout