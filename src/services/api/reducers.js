export function authenticator(state = null, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        username: action.username,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      }
    
    case 'LOGOUT':
      return {
        username: null,
        accessToken: null,
        refreshToken: null,
      }
    
    default:
        return {
          username: localStorage.getItem('username'),
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
        }
  }
}
