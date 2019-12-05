import store from '../../store'
import { login, logout, refresh, setKeywords, deleteKeyword } from './actions'

class API {
  constructor() {
    this.account = store.getState().authenticator;

    store.subscribe(() => this.account = store.getState().authenticator);

    this.urlRoot = process.env.REACT_APP_API_URL;
    this.urlLogin = `${this.urlRoot}/login`;
    this.urlRefresh = `${this.urlRoot}/refresh`;

    /* Keyword URLs */
    this.urlKeywordRoot = `${this.urlRoot}/keywords`;
    this.urlKeywords = `${this.urlKeywordRoot}`;

    /* Keyword Language URLs */
    this.urlLanguagesRoot = `${this.urlKeywordRoot}/languages`;
    this.urlKeywordLanguagesAvailable = `${this.urlLanguagesRoot}/available`;
  }

  async getKeywords() {
    const request = {
      method: 'GET',
      headers: this.headersDefault(),
    }

    const response = await this.sendRequest(this.urlKeywords, request);

    let keywords = [];
    if (response.ok) {
      keywords = await response.json();
    }

    store.dispatch(setKeywords(keywords));

    return keywords;
  }

  async addKeyword(keyword, language) {
    const request = {
      method: 'POST',
      headers: this.headersDefault(),
      body: JSON.stringify({keyword, language}),
    }

    await this.sendRequest(this.urlKeywords, request);

    /* Refresh keywords */
    return this.getKeywords();
  }

  async deleteKeyword(_id) {
    const request = {
      method: 'DELETE',
      headers: this.headersDefault(),
    }

    const url = `${this.urlKeywords}/${_id}`
    
    this.sendRequest(url, request);

    store.dispatch(deleteKeyword(_id));
  }

  async getLanguagesAvailable() {
    const request = {
      method: 'GET',
      headers: this.headersDefault()
    }

    const response = await this.sendRequest(this.urlKeywordLanguagesAvailable, request);

    let languages = [];
    if (response.ok) {
      languages = await response.json();
    }

    return languages.sort();
  }

  headersDefault() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.account.accessToken,
    }
  }

  /**
   * Send a request to the API server
   * @param {string} url 
   * @param {Object} request 
   */
  async sendRequest(url, request) {
    let response = await fetch(url, request);

    /* Maybe the token is expired? */
    if (!response.ok) {
      await this.refresh();
      response = await fetch(url, request);
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
    } else {
      throw new Error('unable to log in');
    }
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
