import React, { Component } from 'react'
import loading from './loading.gif'

export class spinner extends Component {
    render() {
        return (
            <div className="text-center my-3">
                <img src={loading} alt="loading" />
            </div>
        )
    }
}
export default spinner
