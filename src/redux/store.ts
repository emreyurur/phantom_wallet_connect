// src/redux/index.ts

import { createStore, combineReducers } from 'redux';
import nacl from 'tweetnacl';

// Actions
export const SET_KEY_PAIR = 'SET_KEY_PAIR';

// Action creators
export const setKeyPair = (keyPair: nacl.BoxKeyPair) => ({
  type: SET_KEY_PAIR,
  payload: keyPair,
});

// Reducers
const keyPairReducer = (state: nacl.BoxKeyPair | null = null, action: any) => {
  switch (action.type) {
    case SET_KEY_PAIR:
      return action.payload;
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  keyPair: keyPairReducer,
});

// Create store
const store = createStore(rootReducer);

export default store;
