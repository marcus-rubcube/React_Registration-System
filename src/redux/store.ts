import {configureStore} from '@reduxjs/toolkit';
import clientSlice from './clientReducer';
import providerSlice from './providerReducer';
import productSlice from './productReducer';
import categorySlice from './categoryReducer';

const store = configureStore({
    reducer:{
        clients: clientSlice,
        providers: providerSlice,
        products: productSlice,
        categories: categorySlice,
    }
});

export default store;