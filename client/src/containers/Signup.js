import React, { Component } from 'react'
import '../css/App.css'
import '../css/auth.css'
import '../css/TopNav.css'

class Signup extends Component{
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
        fetch('/signup',{
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            method: 'post',
            body: JSON.stringify({user: {...this.state}})
          }).then((res) => {
              if(res.status === 400) {
                this.props.history.push('/signup')
              }
              else if(res.status === 201)
                this.props.history.push('/')
            })
    }
    render(){
        return  <div id='auth'>
                    <form onSubmit={this.handleSubmit}>
                        <h1 id='auth-header'>Sign Up</h1>
                        <label id='lbl-first-name' className='lbl-auth'>First name</label>
                        <input id='first-name' className='lbl-auth'/>
                        <br/>
                        <label id='lbl-last-name' className='lbl-auth'>Last Name</label>
                        <input id='second-name'/>
                        <br/>
                        <label id='lbl-email' className='lbl-auth'>Email Address</label>
                        <input id='email' onChange={this.handleChange} value={this.state.name}/>
                        <br/>
                        <label id='lbl-password' className='lbl-auth'>Password</label>
                        <input id='password' onChange={this.handleChange} value={this.state.password}/>
                        <br/>
                        <input type="submit" value="Sign Up" className='button'/>
                        <br/>
                        <label id='lbl-existing'>Already have an account? <span id='span-sign-in'>Sign in</span></label>
                    </form>
            </div>
    }
}

export default Signup