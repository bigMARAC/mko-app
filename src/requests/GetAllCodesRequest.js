import axios from 'axios'

export default class GetAllCodesRequest {
  constructor(customer_id) {
    this.customer_id = customer_id
    this.baseUrl = `${window.config.API_URL}/customer/codes/`
  }

  send() {
    return axios.get(this.baseUrl + this.customer_id)
  }
}