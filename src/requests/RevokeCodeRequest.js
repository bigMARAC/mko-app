import axios from 'axios'

export default class RevokeCodeRequest {
  constructor(code) {
    this.code = code
    this.baseUrl = `${window.config.API_URL}/code/revoke/`
  }

  send() {
    return axios.put(this.baseUrl + this.code)
  }
}