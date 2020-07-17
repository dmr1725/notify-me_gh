import React from 'react'
import {connect} from 'react-redux'
import {appointments_assigned_qty, appointments_given_qty, sales_quantity} from '../actions'

class Stats extends React.Component{

    componentDidMount = ()=>{
        this.props.appointments_assigned_qty()
        this.props.appointments_given_qty()
        this.props.sales_quantity()
    }

    renderStats = ()=>{
        if(!this.props.given){
            return <div>Stats not found</div>
        }

        if(this.props.given === 'Appointments not found'){
            return <div>Stats not found</div>
        }

        if(this.props.assigned && this.props.given && this.props.sales){
            return (
                <div className="ui grid">
                    <div className="five wide column">
                        <div className="ui segment">Appointments Assigned: {this.props.assigned}</div>
                    </div>
                    <div className="five wide column">
                       <div className="ui segment"> Appointments Given: {this.props.given}</div>
                    </div>
                    <div className="five wide column">
                        <div className="ui segment">Total Sales: {this.props.sales}</div>
                    </div>
                   
                </div>
            )
        }
    }

    render(){
        return <div>{this.renderStats()}</div>
    }
}

const mapStateToProps = (state)=>{
    return {
        assigned: state.appAssignQtyReducer,
        given: state.appGivenQtyReducer,
        sales: state.salesQtyReducer
    }
}

export default connect(mapStateToProps, {appointments_assigned_qty, appointments_given_qty, sales_quantity})(Stats)