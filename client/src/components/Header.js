import React from 'react'
import TopNav from '../containers/TopNav'
import ResponsiveCompononent from '../components/Responsive'

const styles = {
    imgHeaderStyle: {
        width: '100%',
        maxHeight: '450px'
    },
    divImageContainer: {
        position: 'relative'
    },
    aNavLink: {
        position: 'absolute',
        display: 'inline-block',
        fontStyle: 'italic',
        textShadow: '2px 2px 3px #ffffff',
        textDecoration: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 745,
        bottom: '50px'
    },
    aBoys: {
        right: '17%'
    },
    aMen: {
        right: '21%'
    },
    aGirls: {
        right: '27%'
    },
    aWomen: {
        right: '31%'
    },
    divHeader: {
        position: 'relative'
    }
}

class Header extends ResponsiveCompononent{
    constructor(props){
        super(props)
        this.state = {
            ...styles
        }
    }

    response(){
        return {
            default: () => {return { aBoys: {right: '17%'},
                                     aMen: {right: '21%'},
                                     aGirls: {right: '27%'},
                                     aWomen: {right: '31%'}
                            }},
            maxWidth: {
                1148: () => { return { aBoys: {right: '14%'},
                                       aMen: {right: '19%'},
                                       aGirls: {right: '27%'},
                                       aWomen: {right: '32%'}
                            }},
                894: () => { return { aBoys: {right: '14%'},
                                      aMen: {right: '20%'},
                                      aGirls: {right: '30%'},
                                      aWomen: {right: '36%'}
                            }},
                726: () => { return { aBoys: {right: '14%'},
                                      aMen: {right: '22%'},
                                      aGirls: {right: '36%'},
                                      aWomen: {right: '44%'}
                            }},
                497: () => { return { aBoys: {right: '16%'},
                                      aMen: {right: '29%'},
                                      aGirls: {right: '42%'},
                                      aWomen: {right: '55%'}
                            }}
                        },
            newState: (newState, lowestBreak) => { this.setState(newState) }
        }
    }
    
    render(){
        return  <div id='header' style={{...this.state.divHeader}}>
                    <TopNav/>
                    <div>
                        <img src='/header2.png' id='header-img' alt='header' style={this.state.imgHeaderStyle}/>
                        <a className='aNavLink' style={{...this.state.aNavLink, ...this.state.aWomen}}>Women</a>
                        <a className='aNavLink' style={{...this.state.aNavLink, ...this.state.aGirls}}>Girls</a>
                        <a className='aNavLink' style={{...this.state.aNavLink, ...this.state.aMen}}>Men</a>
                        <a className='aNavLink' style={{...this.state.aNavLink, ...this.state.aBoys}} id='navlink-boys'>Boys</a>
                    </div>
                </div>
    }
} 

export default Header