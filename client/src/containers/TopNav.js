import React, { Component } from 'react'
import TopNavSearch from '../components/TopNavSearch'
import { Transform } from 'stream';
import ResponsiveComponent from 'responsive-component'

const styles = {
    divTopNavStyle: {
        width: '100%',
        height: '60px',
        textAlign: 'center'
    },
    aStyle: {
        fontFamily: 'Bodoni MT',
        fontSize: '20px',
        fontWeight: '500',
        textShadow: '2px 2px 2px #ffffff',
        textDecoration: 'none',
        marginTop: '20px',
        display: 'inline-block',
        cursor: 'pointer'
    },
    aMyAccountStyle: {
        float: 'left',
        marginLeft: '5%',
        display: 'inline-block'
    },
    aCartCheckOutStyle: {
        float: 'right',
        marginRight: '10%'
    },
    spanCartCheckoutStyle: {
        display: 'inline-block'  
    },
    imgCartIconStyle: {
        position: 'absolute',
        top: '21px',
        transform: 'translateX(-35px)'
    },
    thirdPartyIconStyle: {
        float: 'right',
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        transform: 'translateX(-140px)',
        cursor: 'pointer'
    },
    hamburgerIconStyle: {
        display: 'none',
        float: 'left'
    }
}

class TopNav extends ResponsiveComponent {
    constructor(props){
        super(props)
        this.state = {
            ...styles
        }
    }

    response(){
        return {
            default: () => { return {thirdPartyIconStyle: {transform: 'translateX(-140px)', display: 'inline-block'}, 
                                     spanCartCheckoutStyle: {display: 'inline-block'},
                                     aCartCheckOutStyle: {marginRight: '10%', transform: 'none'},
                                     aMyAccountStyle: {display: 'inline-block'},
                                     imgCartIconStyle: {transform: 'translateX(-35px)'},
                                     hamburgerIconStyle: {display: 'none'}
                                    }},
            maxWidth: {
                1806: () => { return {thirdPartyIconStyle: {transform: 'translateX(-100px'}}},
                1196: () => { return {thirdPartyIconStyle: {transform: 'translateX(-50px'}}},
                916: () => { return {spanCartCheckoutStyle: {display: 'none'}}},
                556: () => { return {thirdPartyIconStyle: {transform: 'none'},
                                     aCartCheckOutStyle: {transform: 'translate(50px,-19px)'},
                                     aMyAccountStyle: {display: 'none'},
                                     hamburgerIconStyle: {display: 'inline-block'}
                            }},
                401: () => { return {thirdPartyIconStyle: {display: 'none'},
                                     aCartCheckOutStyle: {transform: 'translate(-8px, -19px)'}
                            }}
            },
            newState: (newState) => { this.setState(newState) }
        }
    }

    render(){
        return  <div id='topnav' style={this.state.divTopNavStyle}>
                    <a id='topnav-myaccount' style={{...this.state.aStyle, ...this.state.aMyAccountStyle}}>My Account</a>
                    <a><img src='hamburgericon.fw.png' style={this.state.hamburgerIconStyle}/></a>
                    <a><img src='facebookicon.fw.png' id='' alt='third-party-icon' alt='facebook' style={this.state.thirdPartyIconStyle}/></a>
                    <a><img src='pinterest.fw.png' id='third-party-icon' alt='pinterest' style={this.state.thirdPartyIconStyle}/></a>
                    <a><img src='twittericon.fw.png' className='third-party-icon' alt='twitter' style={this.state.thirdPartyIconStyle}/></a>
                    <TopNavSearch/>
                    <a id='topnav-cart-checkout' style={{...this.state.aStyle, ...this.state.aCartCheckOutStyle}}>
                        <img src='carticon.fw.png' id='topnav-cart-icon' alt='cart' style={this.state.imgCartIconStyle}/>
                        <span style={this.state.spanCartCheckoutStyle}>View Cart [ 0 ] / Checkout</span>
                    </a>
                </div>
    }
}

export default TopNav