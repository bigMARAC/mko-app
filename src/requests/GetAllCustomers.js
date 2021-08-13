import axios from 'axios'

export default class GetAllCustomers {
  constructor(token) {
    this.token = token
    this.baseUrl = 'http://localhost:3000/customer/getall'
  }

  send() {
    const headers = {
      'authorization': `Bearer ${this.token}`
    }
    return axios.get(this.baseUrl, { headers })
  }
}