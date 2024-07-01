import {configureStore} from '@reduxjs/toolkit';
import {dummyJsonApi} from './dummyJson/dummyJson.api';

export const store = configureStore({
    reducer: {
        [dummyJsonApi.reducerPath]: dummyJsonApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(dummyJsonApi.middleware)
})