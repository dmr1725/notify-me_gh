import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {today, demo_given} from '../actions'

class Today extends React.Component{

    state = {
        disabled: []
    }

    componentDidMount=()=>{
        this.props.today()
    }


    renderAppointments = ()=>{
        if(!this.props.appointments){
            return <div>Loading appointments...</div>
        }
        
        const appointments = Object.values(this.props.appointments)
        
        let i = 0
        return (
           <div>
               <h1>Appointments for today</h1>
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
                                    <button key={appointment.id} className="ui button primary"
                                        disabled={this.state.disabled.indexOf(appointment.id)!==-1}
                                        onClick={()=>{
                                            this.props.demo_given(appointment.id, appointment.client_id)
                                            this.setState({
                                                disabled: [...this.state.disabled, appointment.id]
                                            })
                                        }}
                                    >

                                        Completed
                                    </button>
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

        // if(this.props.appointments){
        //     console.log(this.props.appointments)
        // }

        return (
            <div>
                <Header/>
                <div>
                    {this.renderAppointments()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        appointments: state.todayReducer,
        completed: state.demoGivenReducer
    }
}

export default connect(mapStateToProps, {today, demo_given})(Today)