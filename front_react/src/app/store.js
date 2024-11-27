import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; // Import combineReducers
import userReducer from './userSlice';
import cardReducer from './cardSlice';
import generationReducer from './generationSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};

// Combine your reducers using combineReducers
const rootReducer = combineReducers({
  user: userReducer,
  cards: cardReducer,
  generation :generationReducer
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
});

export default store; // Default export
export const persistor = persistStore(store);
