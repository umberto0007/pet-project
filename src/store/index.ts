import {configureStore} from '@reduxjs/toolkit';

import {productsApi} from '#store/products/products.api';
import {authApi} from '#store/auth/auth.api';


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(productsApi.middleware),
});