import {configureStore} from '@reduxjs/toolkit';
import clientSlice from './clientReducer';

const store = configureStore({
    reducer:{
        clients: clientSlice,
    }
});

export default store;