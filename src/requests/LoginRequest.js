import axios from 'axios'

export default class LoginRequest {
  constructor(username, password) {
    this.username = username,
    this.password = password,
    this.baseUrl = 'http://localhost:3000/barber/auth'
  }

  send() {
    return axios.post(this.baseUrl, {
      username: this.username,
      password: this.password
    })
  }
}