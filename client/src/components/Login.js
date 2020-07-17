import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {sign_in} from '../actions'

class Login extends React.Component{

    state = {
        redirect: false,
        email: '',
        password: ''
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        // this.setState({redirect: true})
        const {email, password} = this.state
        this.props.sign_in(email, password)
    }

    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    redirectTo = ()=>{

       if(this.props.auth){
           if(this.props.auth.message === 'Unable to log in'){
                return <div>{this.props.auth.message}</div>
           }
       } 

       if(this.props.auth){
        //    console.log(this.props.auth.message)
           if(this.props.auth.message === 'logged in'){
               return <Redirect to="/user/dashboard"/>
           }
       }
    }

    render(){
        // if(this.props.auth){
        //     console.log(this.props.auth.message)
        // }
        return (
           <div className="diego">
               <div className="ui middle aligned center aligned grid">
                   <div className="column">
                       <h1 className="ui image header">
                           <div className="content">
                               Login
                           </div>
                       </h1>
                       <form className="ui form" onSubmit={this.handleSubmit}>
                           <input name="email" placeholder="E-mail address"
                                value={this.state.email}
                                onChange={this.handleChange}
                           />
                           <input name="password" placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                           />
                           <button className="ui button primary">
                               Submit
                           </button>
                           {this.redirectTo()}
                       </form>
                       
                   </div>
               </div>
           </div>
       
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        auth: state.signInReducer
    }
}

export default connect(mapStateToProps, {sign_in})(Login)