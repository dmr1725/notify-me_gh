import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {make_sale} from '../actions'

class MakeSale extends React.Component{

    state ={
        pid: '',
        date: ''
    }

    handleDropdownChange = (e)=>{
        this.setState({pid: e.target.value})
    }

    handleDateChange = (e)=>{
        this.setState({date: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        const {id} = this.props.match.params
        const {pid, date} = this.state
        
        this.props.make_sale(id, pid, date)
    }

    redirectTo = ()=>{
        if(this.props.sale){
            if(this.props.sale.message === 'Sale was made!'){
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
                                Creating sale
                            </div>
                            <p>Once sale is created successfully, you will be redirected to your dashboard</p>
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
                        Create Sale
                    </div>
                </div>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field"> 
                        <label>Product</label>
                        <select className="ui fluid search dropdown" multiple="" onChange={this.handleDropdownChange}>
                            <option value="">Select Product</option>
                            <option value="1">RO COMBO EC5</option>
                            <option value="2">RO COMBO TC-CAB</option>
                            <option value="3">RO COMBO QRS</option>
                            <option value="4">Osmosis</option>
                            <option value="5">Osmosis con alcalino</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Date</label>
                        <input type="text" placeholder="Ex:2020-12-25"
                            onChange={this.handleDateChange}
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
        sale : state.makeSaleReducer
    }
}


export default connect(mapStateToProps, {make_sale})(MakeSale)