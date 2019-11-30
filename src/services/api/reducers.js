export function authenticator(state = null, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        username: action.username,
      }
    
    case 'LOGOUT':
      return {
        username: null,
      }
    
    default:
        return {
          username: localStorage.getItem('username'),
        }
  }
}
