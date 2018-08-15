import React, { Component } from 'react'
import Home from "views/home/index.jsx";

class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            text:"外部容器"
        }
    }

    render() {
        let {text} = this.state
        return (
            <div>
                <p>{text}</p>
                <Home/>
            </div>
        )
    }
}

export default Index