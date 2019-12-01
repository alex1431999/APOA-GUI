import store from '../../store'
import { login, logout, refresh } from './actions'

class API {
  constructor() {
    this.account = store.getState().authenticator;

    store.subscribe(() => this.account = store.getState().authenticator);

    this.url = process.env.REACT_APP_API_URL;
    this.urlLogin = `${this.url}/login`;
    this.urlRefresh = `${this.url}/refresh`;
  }

  async sendRequest(request) {
    let response = await fetch(request);

    /* Maybe the token is expired? */
    if (!response.ok) {
      await this.refresh();
      response = await fetch(request);
    }

    return response;
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
      const body = await response.json();
      const accessToken = body.access_token;
      const refreshToken = body.refresh_token;
      
      store.dispatch(login(username, accessToken, refreshToken));
    }

    return response;
  }

  /**
   * Refresh access token
   */
  async refresh() {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.account.refreshToken,
      }
    }

    const response = await fetch(this.urlRefresh, request);

    if (response.ok) {
      const body = await response.json();
      const accessToken = body.access_token;

      store.dispatch(refresh(accessToken));
    } else { // If the token is expired then you should log the user out
      store.dispatch(logout);
    }

    return response.ok;
  }
}

export default new API()
