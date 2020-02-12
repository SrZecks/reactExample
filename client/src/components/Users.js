import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/App.css';

export class Users extends Component {


    render() {
        const { users } = this.props

        return users.map(user => (
            
            <div key={user.id} className="userFlex">
                <div>id: {String(user.id).split('-')[0]}</div>
                <div>Nome: {user.name}</div>
                {/*<div>Idade: {user.age}</div> */}
                <div className="closeBtn">
                    <FontAwesomeIcon onClick={this.props.delUser.bind(this, user)} icon="times-circle" />
                </div>
            </div>
        ));
    }
}

export default Users