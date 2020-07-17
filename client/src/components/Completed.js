import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {completed} from '../actions'
import {Link} from 'react-router-dom'

class Completed extends React.Component{

    componentDidMount = ()=>{
        this.props.completed()
    }

    renderAppointments = ()=>{
        if(!this.props.appointments){
            return <div>Loading appointments...</div>
        }
        
        const appointments = Object.values(this.props.appointments)
        
        let i = 0
        return (
           <div>
               <h1>Appointments Completed</h1>
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
                                    <Link to={`/user/makeSale/${appointment.id}`} className="ui button primary">
                                        Sale
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
                            These are the appointmetns that were given to the client, but there was no sale for the moment. 
                        </div>
                        <p>
                            If the sale was made in the appointment, please enter the button 'sale' and create the sale. Don't worry if you 
                            didn't made the sale. There's a thing called follow up!
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
        appointments: state.completedReducer
    }
}

export default connect(mapStateToProps, {completed})(Completed)