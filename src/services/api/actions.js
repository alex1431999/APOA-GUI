export function login(username, accessToken, refreshToken) {
  localStorage.setItem('username', username);
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return {
    type: 'LOGIN',
    username,
    accessToken,
    refreshToken,
  }
}

export function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  return {
    type: 'LOGOUT'
  }
}
