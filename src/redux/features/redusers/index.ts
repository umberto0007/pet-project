import {combineReducers} from '@reduxjs/toolkit';

import {userReducer} from '#redux/features/user/userSlice';
import {authSliceApi} from '#redux/api/authSlice.api';
import {productsSliceApi} from '#redux/api/productsSlice.api';


export const rootReducer = combineReducers({
    user: userReducer,
    [authSliceApi.reducerPath]: authSliceApi.reducer,
    [productsSliceApi.reducerPath]: productsSliceApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>