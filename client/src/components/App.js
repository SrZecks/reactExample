import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Header from './Header'
import InputUser from './InputUser'
import Users from './Users';
import uuid from 'uuid'
import axios from 'axios'
import '../css/App.css';

library.add(fab, fas)

class App extends Component {
  // State
  state = {
    users: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/getUsers')
      .then(res => this.setState({ users: res.data }))
      .catch(err => { alert(err) })
  }
  // Functions
  delUser = (user) => {
    let { id } = user
    axios.delete('http://localhost:5000/delUser', { params: { id: id } })
      .then(res => this.setState({ users: [...this.state.users.filter(user => user.id !== id)] }))
      .catch(err => { alert(err) })
  }

  addUser = (name) => {
    let newUser = {
      id: uuid.v4(),
      name: name
    }

    axios.post('http://localhost:5000/addUser', null, { params: newUser })
      .then(res => {
        this.setState({ users: [...this.state.users, res.data[0]] })
      })
      .catch(err => { alert(err) })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <InputUser addUser={this.addUser} />
        <h2 style={{ textAlign: 'center' }}> Usuarios</h2>
        <div className="userArea">
          <Users users={this.state.users} delUser={this.delUser} />
        </div>
      </div>
    );
  }
}

export default App;