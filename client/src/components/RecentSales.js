import React from 'react'
import {connect} from 'react-redux'
import {recent_sales} from '../actions'


class RecentSales extends React.Component{

    componentDidMount = ()=>{
        this.props.recent_sales()
    }

    renderSales = ()=>{
        if(!this.props.sales){
            return <div>Loading Sales...</div>
        }
        
        const sales = Object.values(this.props.sales)
        let i = 0

        return (
           <div>
               <h1>Recent Sales</h1>
               <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Date</th>
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
                            </tr>
                            )
                    })}
                </tbody>
            </table>
           </div>
        )
    }

    render(){
        // if(this.props.sales){
        //     console.log(this.props.sales)
        // }
        return <div>{this.renderSales()}</div>
    }
}

const mapStateToProps = (state)=>{
    return {
        sales: state.recentSalesReducer
    }
}

export default connect(mapStateToProps, {recent_sales})(RecentSales)