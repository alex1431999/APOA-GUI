export function login(username) {
  localStorage.setItem('username', username);
  return {
    type: 'LOGIN',
    username,
  }
}

export function logout() {
  localStorage.removeItem('username');
  return {
    type: 'LOGOUT'
  }
}
