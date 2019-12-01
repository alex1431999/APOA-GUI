import store from '../../store'
import { login } from './actions'

class API {
  constructor() {
    this.username = store.getState().authenticator.username;

    store.subscribe(() => this.username = store.getState().authenticator.username);

    this.url = process.env.REACT_APP_API_URL;
    this.urlLogin = `${this.url}/login`;
  }

  /**
   * Log a user in to the API
   * 
   * If the login was successful the username is stored in the store
   * @param {String} username 
   * @param {String} password 
   */
  async login(username, password) {
    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
    }

    const response = await fetch(this.urlLogin, request);

    if (response.ok) {
      store.dispatch(login(username));
    }

    return response;
  }
}

export default new API()
