import axios from 'axios'

export default class LoginRequest {
  constructor(customer_id) {
    this.customer_id = customer_id,
    this.baseUrl = 'http://localhost:3000/code/generate/'
  }

  send() {
    return axios.get(this.baseUrl + this.customer_id)
  }
}