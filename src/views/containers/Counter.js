import React from 'react'
import { connect } from 'react-redux'
import Counter from 'views/counter'
import { increaseAction } from 'actions';

function mapStateToProps(state) {
    console.log(state)
    return {
      value: state.counter.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        btnClick: () => dispatch(increaseAction)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)