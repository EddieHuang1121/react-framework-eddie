import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {value, btnClick} = this.props
        return (
            <div>
                <div>{value}</div>
                <button onClick={btnClick}>click</button>
            </div>
        )
    }
}

export default Counter