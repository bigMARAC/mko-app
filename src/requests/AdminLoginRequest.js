import axios from 'axios'

export default class LoginRequest {
  constructor(username, password) {
    this.username = username,
    this.password = password,
    this.baseUrl = `${window.config.API_URL}/barber/auth`
  }

  send() {
    return axios.post(this.baseUrl, {
      username: this.username,
      password: this.password
    })
  }
}