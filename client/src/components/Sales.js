import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {allSales, delete_sale} from '../actions'

class Today extends React.Component{

    state = {
        disabled: []
    }

    componentDidMount=()=>{
        this.props.allSales()
    }


    renderAppointments = ()=>{
        if(!this.props.sales){
            return <div>Loading sales...</div>
        }
        
        const sales = Object.values(this.props.sales)
        
        let i = 0
        return (
           <div>
               <h1>All your sales</h1>
               <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale)=>{
                        return (
                            <tr key={i++}>
                                <td data-label="Name">{sale.name}</td>
                                <td data-label="Last Name">{sale.last_name}</td>
                                <td data-label="Product">{sale.pname}</td>
                                <td data-label="Price">{sale.price}</td>
                                <td data-label="Status">{sale.status}</td>
                                <td data-label="Date">{sale.date}</td>
                                <td data-label="Action">
                                    {sale.status === 'Pending' ? 
                                        <button key={sale.id} className="ui button negative"
                                        disabled={this.state.disabled.indexOf(sale.id)!==-1}
                                        onClick={()=>{
                                            this.props.delete_sale(sale.id)
                                            this.setState({
                                                disabled: [...this.state.disabled, sale.id]
                                            })
                                        }}
                                    >

                                        Delete
                                        </button> :
                                        <button className="ui button green">Done</button>
                                    }
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
        sales: state.salesReducer,
        deleted: state.deleteSaleReducer
    }
}

export default connect(mapStateToProps, {allSales, delete_sale})(Today)