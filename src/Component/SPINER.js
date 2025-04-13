import React, { Component } from 'react'
import spineer from './spineer.png'

export default class SPINER extends Component {
    render() {
        return (
            <div className='text-center my-6'>
                <img src={spineer} alt="Loding" />
            </div>
        )
    }
}
