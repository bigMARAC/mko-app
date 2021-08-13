import axios from 'axios'

export default class GenerateCodeRequest {
  constructor(token, customer_id) {
    this.token = token
    this.customer_id = customer_id,
    this.baseUrl = `${window.config.API_URL}/code/generate/`
  }

  send() {
    const headers = {
      'authorization': `Bearer ${this.token}`
    }
    return axios.get(this.baseUrl + this.customer_id, { headers })
  }
}