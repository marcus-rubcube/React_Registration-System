import {configureStore} from '@reduxjs/toolkit';
import clientSlice from './clientReducer';
import providerSlice from './providerReducer';
import productSlice from './productReducer';
import categorySlice from './categoryReducer';
import purchaseSlice from './purchaseReducer';
import { saleSlice } from './saleReducer';

const store = configureStore({
    reducer:{
        clients: clientSlice,
        providers: providerSlice,
        products: productSlice,
        categories: categorySlice,
        purchases: purchaseSlice,
        sales: saleSlice.reducer,
    }
});

export default store;