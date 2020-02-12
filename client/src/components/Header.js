import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../img/logo.svg';
import '../css/App.css';

export class Header extends Component {
    render() {
        return (
            <div className="header">
                <img src={logo} className="App-logo" alt="logo" />
                <br></br>

                <div className="headerFlex">
                    <div><FontAwesomeIcon icon={['fas', 'cloud']} /></div>
                    <div><FontAwesomeIcon icon={['fab', 'js']} /></div>
                    <div><FontAwesomeIcon icon={['fab', 'react']} /></div>
                    <div><FontAwesomeIcon icon={['fab', 'node-js']} /></div>
                </div>
            </div>
        )
    }
}

export default Header

