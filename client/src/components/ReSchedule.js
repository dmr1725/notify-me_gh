import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {re_schedule} from '../actions'


class ReSchedule extends React.Component{
    state ={
        date: '',
        hour: ''
    }

    handleHourchange = (e)=>{
        this.setState({hour: e.target.value})
    }

    handleDateChange = (e)=>{
        this.setState({date: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        const {id} = this.props.match.params
        const {hour, date} = this.state
        
        this.props.re_schedule(id, date, hour)
    }

    redirectTo = ()=>{
        if(this.props.newAppointment){
            if(this.props.newAppointment.message === 'Appointment updated'){
                const {history} = this.props
                setTimeout(function(){
                    return (
                        history.push('/user/dashboard')
                    )
                }, 3000)
            }

            return (
                <div className="ui icon message">
                    <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Re-Scheduling Appointment
                            </div>
                            <p>Once re-schedule is created successfully, you will be redirected to your dashboard</p>
                        </div>
                </div>
            )
        }
    }

    render(){
        return (
            <div>
                <Header/>
                <div className="ui message">
                    <div className="header">
                        Re-Schedule
                    </div>
                </div>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field"> 
                        <label>Date</label>
                        <input type="text" placeholder="Ex:2020-12-25"
                            onChange={this.handleDateChange}
                        />  
                    </div>
                    <div className="field">
                        <label>Hour</label>
                        <input type="text" placeholder="Number"
                            onChange={this.handleHourchange}
                        />  
                    </div>
                    <button className="ui button primary">Submit</button>
                </form>
                {this.redirectTo()}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        newAppointment: state.reScheduleReducer
    }
}

export default connect(mapStateToProps, {re_schedule})(ReSchedule)