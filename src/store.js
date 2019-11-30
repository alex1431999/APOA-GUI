import { createStore, combineReducers } from 'redux'

import { authenticator } from './services/api/reducers'

/* Add any new reducers here */
const reducers = combineReducers({
  authenticator,
})

const store = createStore(reducers);

export default store;
