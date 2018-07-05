import React, { Component } from 'react'
import { ENGINE_METHOD_NONE } from 'constants';
import Util from "utils";
import API from "utils/api";

import "./index.scss";

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            text:"这只是测试"
        }
    }

    componentDidMount() {
        Util.get(API.getUserList).then(res => {
            console.log(res)
        })
    }

    render() {
        let {text} = this.state
        return (
            <div>
                <p className="home">HomePage</p>
                <span>{text}</span>
                <div className="img"></div>
            </div>
        )
    }
}

export default Home