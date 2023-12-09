import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { authReducer } from './auth/auth.slice'
import { filtersReducer } from './filters/filters.slice'

const authPersistConfig = {
  key: 'auth',
  storage,
}

const filtersPersistConfig = {
  key: 'filters',
  storage,
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  filters: persistReducer(filtersPersistConfig, filtersReducer),
})

export default rootReducer
