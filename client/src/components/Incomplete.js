import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {incomplete} from '../actions'
import {Link} from 'react-router-dom'

class Incomplete extends React.Component{

    componentDidMount = ()=>{
        this.props.incomplete()
    }

    renderAppointments = ()=>{
        if(!this.props.appointments){
            return <div>Loading appointments...</div>
        }
        
        const appointments = Object.values(this.props.appointments)
        
        let i = 0
        return (
           <div>
               <h1>Appointments Not Completed</h1>
               <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Hour</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment)=>{
                        return (
                            <tr key={i++}>
                                <td data-label="Name">{appointment.name}</td>
                                <td data-label="Last Name">{appointment.last_name}</td>
                                <td data-label="Hour">{appointment.hour}</td>
                                <td data-label="Date">{appointment.date}</td>
                                <td data-label="Action">
                                    <Link to={`/user/reSchedule/${appointment.id}`} className="ui button primary">
                                        Re-Schedule
                                    </Link>
                                </td>
                            </tr>
                            )
                    })}
                </tbody>
            </table>
           </div>
        )
    }

    render(){
        return (
            <div>
                <Header/>
                <div>
                    <div className="ui message">
                        <div className="ui header">
                            These are the appointmetns that were not given to the client
                        </div>
                        <p>
                            If you re-scheudle, it is assumed that you and your client did an agreement to re-schedule. 
                        </p>
                    </div>
                    {this.renderAppointments()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        appointments: state.notGivenReducer
    }
}

export default connect(mapStateToProps, {incomplete})(Incomplete)