import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Header from './Header'
import InputUser from './InputUser'
import Users from './Users';
import uuid from 'uuid'
import axios from 'axios'
import '../css/App.css';

const MySwal = withReactContent(Swal)

library.add(fab, fas)

class App extends Component {
  // State
  state = {
    users: []
  }

  componentDidMount() {
    axios.get('/getIp')
      .then(res => {
        if (res.data > 0) {
          axios.get("/getName")
            .then(res => {
              console.log(res);
              MySwal.fire({
                title: "Olá",
                text: `Seja bem vindo ${res.data[0].name}`,
                icon: "success",
                timer: 4000,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey:false
              }).then(result => {
                axios.get('/getUsers')
                .then(res => { this.setState({ users: res.data }) })
                .catch(err => { alert(err) })
              })
            })
        } else {
          MySwal.fire({
            title: "Bem vindo",
            text: "Qual o seu nome?",
            icon: "question",
            confirmButtonText: "Confirmar",
            allowOutsideClick: false,
            allowEscapeKey: false,
            input: "text",
            inputValidator: (value) => {
              if (!value) {
                return 'Por favor informe seu nome'
              }
            },
          }).then(result => {
            if (result.value) {
              let newUser = {
                name: result.value
              }
              axios.post('/addUser', null, { params: newUser })
                .then(res => {
                  axios.get('/getUsers')
                  .then(res => { this.setState({ users: res.data }) })
                  .catch(err => { alert(err) })
                })
                .catch(err => { alert(err) })
            }
          })
        }
      })


  }
  // Functions
  delUser = (user) => {
    MySwal.fire({
      title: 'Deletar',
      text: `Deseja remover o usuario ${user.name}?`,
      icon: 'warning',
      confirmButtonText: 'OK',
      confirmButtonColor: '#C30000',
      //allowOutsideClick: false
    }).then(result => {
      if (result.value) {
        let { _id } = user
        axios.delete('/delUser', { params: { _id: _id } })
          .then(res => this.setState({ users: [...this.state.users.filter(user => user._id !== _id)] }))
          .catch(err => { alert(err) })
      }
    })
  }

  addUser = (name) => {
    let newUser = {
      id: uuid.v4(),
      name: name
    }

    axios.post('/addUser', null, { params: newUser })
      .then(res => {
        console.log(res);
        this.setState({ users: [...this.state.users, res.data] })
      })
      .catch(err => { alert(err) })
  }

  render() {
    return (
      <div className="App">
        <Header />
        {/*<InputUser addUser={this.addUser} />*/}
        <br />
        <h2 style={{ textAlign: 'center' }}> Lista de IP:</h2>
        <div className="userArea">
          <Users users={this.state.users} delUser={this.delUser} />
        </div>
      </div>
    );
  }
}

export default App;