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

    /* Crawls URLs */
    this.urlCrawlsRoot = `${this.urlRoot}/crawls`;
  }

  async getKeywords() {
    const request = {
      method: 'GET',
      headers: this.headersDefault(),
    }

    const response = await this.sendRequest(this.urlKeywords, request);

    let keywords = [];
    if (response.ok) {
      keywords = (await response.json()).sort((a, b) => a.keyword_string > b.keyword_string ? 1 : -1);
    }

    store.dispatch(setKeywords(keywords));

    return keywords;
  }

  async getKeyword(_id) {
    const request = {
      method: 'GET',
      headers: this.headersDefault(),
    }

    const url = `${this.urlKeywords}/${_id}`;

    const response = await this.sendRequest(url, request);

    let keyword = null;
    if (response.ok) {
      keyword = response.json();
    }

    return keyword;
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

  async getCrawlsPlottingData(keywordId) {
    const request = {
      method: 'GET',
      headers: this.headersDefault(),
    }

    const url = `${this.urlCrawlsRoot}/${keywordId}/plotting_data`;

    const response = await this.sendRequest(url, request);

    let plottingData = null;
    if (response.ok) {
      plottingData = response.json();
    }

    return plottingData;
  }

  async getKeywordAvgScore(keywordId) {
    const request = {
      method: 'GET',
      headers: this.headersDefault(),
    }

    const url = `${this.urlKeywords}/${keywordId}/score`;

    const response = await this.sendRequest(url, request);

    let score = null;
    if (response.ok) {
      score = response.json();
    }

    return score;
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

  async getEntities(keywordId, limit) {
    const request = {
      method: 'GET',
      headers: this.headersDefault(),
    }

    const url = `${this.urlKeywords}/${keywordId}/graph/entities?limit=${limit}`;

    const response = await this.sendRequest(url, request);

    let entities = [];
    if (response.ok) {
      entities = await response.json();
    }

    return entities;
  }

  async getCategories(keywordId, limit) {
    const request = {
      method: 'GET',
      headers: this.headersDefault(),
    }

    const url = `${this.urlKeywords}/${keywordId}/graph/categories?limit=${limit}`;

    const response = await this.sendRequest(url, request);

    let categories = [];
    if (response.ok) {
      categories = await response.json();
    }

    return categories;
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
      const accessToken = await this.refresh();

      // Override header with new access token
      request.headers.Authorization = 'Bearer ' + accessToken;

      // resend the request
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

    let accessToken = null;
    if (response.ok) {
      const body = await response.json();
      accessToken = body.access_token;

      store.dispatch(refresh(accessToken));
    } else { // If the token is expired then you should log the user out
      store.dispatch(logout);
    }

    return accessToken;
  }
}

export default new API()
