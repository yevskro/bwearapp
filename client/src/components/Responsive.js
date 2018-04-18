// ResponsiveComponent coded by Yevgeniy Skroznikov
// MIT License
import React, { Component } from 'react'

class ResponsiveComponent extends Component {
    constructor(props){
        super(props)
    }

    handleBreakpoints = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        let breakpoint, lowestwbp, lowesthbp

        if(this.breakpoints === undefined)
            return
        
        let newStyle = this.insertStyle({}, this.breakpoints.default())
        
        if(this.breakpoints.test)
            console.log(`responsive width(px): ${width} height(px): ${height}`)

            
        const handleMax = (selection) => {
            let lowestbp
            if(this.breakpoints[`max${selection}`] !== undefined){
                let breaks = Object.keys(this.breakpoints[`max${selection}`])
                for(let i = breaks.length - 1; i >= 0; i--){
                    breakpoint = parseInt(breaks[i])
                    if(selection === "Width"){
                        if(breakpoint <= width)
                            break
                    }
                    else if(breakpoint <= height)
                            break
                    lowestbp = breakpoint
                    let styleChange = this.breakpoints[`max${selection}`][breaks[i]]()
                    if(styleChange !== undefined)
                        newStyle = this.insertStyle(newStyle, styleChange)
                }
            }
            return lowestbp
        }    

        lowestwbp = handleMax("Width")
        lowesthbp = handleMax("Height")

        if(Object.keys(newStyle).length !== undefined){
            if(this.breakpoints.test){
                console.log(`changing a style: `)
                console.log(newStyle)
            }    
            this.breakpoints.newState(newStyle, lowestwbp, lowesthbp)
        }
    }

    insertStyle(currentStyle, change){
        let newStyle = {...currentStyle}
        Object.keys(change).forEach(obj => {
            if(newStyle[obj] === undefined){
                newStyle = {...newStyle, [obj]: {...this.state[obj]}}
            }
            Object.keys(change[obj]).forEach(style => {
                newStyle[obj][style] = change[obj][style]
            })
        })
        return newStyle
    }

    componentWillMount(){
        this.breakpoints = this.response()
        this.handleBreakpoints()
        window.addEventListener("resize", this.handleBreakpoints);
    }
}

export default ResponsiveComponent