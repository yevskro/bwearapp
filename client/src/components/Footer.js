import React, { Component } from 'react'
import '../css/Footer.css'

class Footer extends Component{
    render(){
        return <footer>
                    <label>Conditions of use</label>
                    <label>Privacy Notice</label>
                    <label>Help  </label>
                    <br/>
                    <label>&copy; 2018 Beachwear.com, Inc. or its affiliates</label>
            </footer>
    }
}

export default Footer