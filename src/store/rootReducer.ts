import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import testReducer from "./reducers/testReducer";

import {
    FLUSH, PAUSE,
    PERSIST, persistReducer, persistStore, PURGE,
    REGISTER, REHYDRATE
} from 'redux-persist';

const rootReducer = combineReducers({
    test: persistReducer({key: 'testRedux', storage: storage }, testReducer),
});

export default rootReducer;
