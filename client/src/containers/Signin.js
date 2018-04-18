import React, { Component } from 'react'
import '../css/App.css'
import '../css/auth.css'
import '../css/TopNav.css'

class Signin extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch('/signin',{
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            method: 'post',
            body: JSON.stringify({user: {...this.state}})
          }).then((res) => {
              if(res.status === 400) {
                this.props.history.push('/signin')
              }
              else if(res.status === 201)
                this.props.history.push('/')
            })
    }
    render(){
        return  <div id='auth'>
                    <form onSubmit={this.handleSubmit}>
                        <h1 id='auth-header'>Sign in</h1>
                        <label id='lbl-email'>Email</label>
                        <input id='email' onChange={this.handleChange} value={this.state.name}/>
                        <br/>
                        <label id='lbl-password'>Password<span id='forgot-password'>(forgot password?)</span></label>
                        <input id='password' onChange={this.handleChange} value={this.state.password}/>
                        <br/>
                        <input type="submit" value="Sign in" className="button"/>
                        <label id='lbl-new-to'>New to Beachwear? <span id='span-sign-up'>Sign up</span></label>
                    </form>
                </div>
    }
}

export default Signin