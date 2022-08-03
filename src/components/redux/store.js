import { createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['authReducer','favoriteReducer','menuReducer','buyReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }