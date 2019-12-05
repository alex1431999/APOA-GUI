import { createStore, combineReducers } from 'redux'

import { authenticator, keywordManager } from './services/api/reducers'

/* Add any new reducers here */
const reducers = combineReducers({
  authenticator,
  keywordManager,
})

const store = createStore(reducers);

export default store;
