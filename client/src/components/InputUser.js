import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/App.css';

export class InputUser extends Component {

    state = {
        name: ''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })
    
    onClick = (e) => {
        this.props.addUser(this.state.name);
        this.setState({name:''})
    }
    
    render() {
        return (
            <div className="inputFlex">
                <div><input onChange={this.onChange} name="name" value={this.state.name} placeholder="-- Nome do usuario --"/></div>
                <div>
                    <button onClick={this.onClick}>
                    <FontAwesomeIcon icon={['fas', 'user-plus']} />
                    </button>
                </div>
            </div>
        )
    }
}

export default InputUser
