import React from 'react'
import Header from './Header'
import axios from 'axios'
import {connect} from 'react-redux'
import {check_available} from '../actions'

class Disponible extends React.Component{

    state = {
        available: ''
    }

    componentDidMount =()=>{
        this.props.check_available()

        // this.setState({available: this.props.check})
    }

    renderAvailable = ()=>{
        if(this.state.available === '' && this.props.check){
            if(this.props.check[0].available === 1){
                return <div>Estas disponible</div>
            }

            // return <div>No estas disponible</div>
        }

        if(this.state.available === 1){
            return <div>Estas disponible</div>
        }

            return <div>No estas disponible</div>
        
    }

    handleYes = ()=>{
        const token = localStorage.getItem('jwt')
        axios({
            method: 'patch',
            url: 'http://localhost:5000/api/user/disponiblidad',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            // console.log(res)
            if(res.data.val === 1){
                this.setState({available: 1})
            }
        })
    }

    handleNo = ()=>{
        const token = localStorage.getItem('jwt')
        axios({
            method: 'patch',
            url: 'http://localhost:5000/api/user/no_disponible',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            // console.log(res)
            if(res.data.val === 0){
                this.setState({available: 0})
            }
        })
    }



    render(){
        // if(this.props.check){
        //     console.log(this.props.check[0].available)
        // }
        // console.log(this.state.available)

        return (
            <div>
                <Header/>
                <h1>¿Estas disponible?</h1>
                <div className="ui horizontal segments">
                    <div className="ui segment">
                        <button className="ui button primary"
                            onClick={this.handleYes}
                        >
                            Sí
                        </button>
                    </div>
                    <div className="ui segment">
                        <button className="ui button negative"
                            onClick={this.handleNo}
                        >
                            No
                        </button>
                    </div>
                </div>
                <div>{this.renderAvailable()}</div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        check: state.checkAvailableReducer
    }
}

export default connect(mapStateToProps, {check_available})(Disponible)