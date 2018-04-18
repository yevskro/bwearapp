import React, { Component } from 'react'
import ResponsiveComponent from 'responsive-component'
import '../css/TopNav.css'

const styles = {
    inputSearchStyle: {
        width: 'calc(100% - 80px)',
        border: 'none',
        outline: 'none',
        zIndex: '0',
        position: 'relative',
        top: '21px',
        paddingRight: '80px',
        height: '24px'
    },
    divSearchStyle: {
        display: 'inline-block',
        width: '25%',
        position: 'relative',
        marginLeft: '30%'      
    },
    labelSearchStyle: {
        fontStyle: 'italic',
        fontWeight: '543',
        display: 'inline-block',
        position: 'absolute',
        top: '24px',
        right: 'calc(26px + 0.65%)',
        cursor: 'pointer',
        color: '#757575'
    },
    imgSearchIconStyle: {
        position: 'absolute',
        right: '0.65%',
        top: '25px',
        cursor: 'pointer'       
    }
}

class TopNavSearch extends ResponsiveComponent{
    constructor(props){
        super(props)
        this.state = {
            ...styles,
            placeholder: ''
        }
    }

    response(){
        return {
            default: () => { return {divSearchStyle: {marginLeft: '30%', width: '25%', float: 'none'},
                                     labelSearchStyle: {display: 'inline-block'},
                                     inputSearchStyle: {paddingRight: '80px', width: 'calc(100% - 80px)'}
                            }},
            maxWidth: {
                1880: () => { return {divSearchStyle: {marginLeft: '20%'}}},
                1443: () => { return {divSearchStyle: {marginLeft: '10%'}}},
                1156: () => { return {divSearchStyle: {marginLeft: '2%'}}},
                998: () => { return {divSearchStyle: {marginLeft: '15px', float: 'left'}}},
                916: () => { return {labelSearchStyle: {display: 'none'},
                                     inputSearchStyle: {paddingRight: '20px', width: 'calc(100% - 20px)'}
                            }},  
                401: () => { return {divSearchStyle: { width: '50%' }}}
            },
            newState: (newState, lowestBreakpoint) => { 
                console.log(this)
                if(lowestBreakpoint <= 916)
                    newState.placeholder = 'Search'
                else
                    newState.placeholder = ''
                this.setState(newState) 
            },
            test: false
        }
    }

    render(){
        return  <div id='topnav-search-container' style={this.state.divSearchStyle}>
                    <input id='topnav-search-input' placeholder={this.state.placeholder} placeholderStyle={this.inputSearchPlaceholderStyle} style={this.state.inputSearchStyle}/>
                    <label id='topnav-search-label' style={this.state.labelSearchStyle}>Search</label>
                    <img id='topnav-search-icon' src='search.fw.png' style={this.state.imgSearchIconStyle}/>
                </div>
    }
} 
export default TopNavSearch