class API {
  constructor() {
    this.url = process.env.REACT_APP_API_URL;
    this.urlLogin = `${this.url}/login`;
  }

  /**
   * @TODO Still need to handle the reponse instead of returning it
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

    const response = fetch(this.urlLogin, request);

    return response;
  }
}

export default new API()
