import {configureStore} from '@reduxjs/toolkit';

import {rootReducer} from 'src/redux/features/redusers';
import {authSliceApi} from '#redux/api/authSlice.api';
import {productsSliceApi} from '#redux/api/productsSlice.api';

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authSliceApi.middleware)
            .concat(productsSliceApi.middleware),
});