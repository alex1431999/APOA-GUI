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

    case 'REFRSH':
      return {
        accessToken: action.accessToken,
      }
    
    default:
        return {
          username: localStorage.getItem('username'),
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
        }
  }
}

export function keywordManager(state = null, action) {
  switch (action.type) {
    case 'SET-KEYWORDS':
      return {
        keywords: action.keywords,
      }

    case 'DELETE-KEYWORD':
      return {
        keywords: state.keywords.filter(keyword => keyword._id.$oid !== action._id),
      }

    default:
      return {
        keywords: []
      }
  }
}
