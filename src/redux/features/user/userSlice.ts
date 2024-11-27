import {createSlice} from '@reduxjs/toolkit';

import { User} from '#types/entities/user';
import {authSliceApi} from '#redux/api/authSlice.api';




const userSlice = createSlice({
    name: 'user',
    initialState:<User> {
        currentUser: null,
        formType: 'signup'
    },
    reducers: {
        toggleFormType: (state, {payload}) => {
            state.formType = payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authSliceApi.endpoints.createUser.matchFulfilled,
            (state, { payload }) => {
                state.currentUser = payload;
            }
        );
        builder.addMatcher(
            authSliceApi.endpoints.loginUser.matchFulfilled,
            (state, {payload}) => {
                state.currentUser = payload
            }
        );
        builder.addMatcher(
            authSliceApi.endpoints.getProfile.matchFulfilled,
            (state, {payload}) => {
                state.currentUser = payload;
            }
        );
    },
});

export const {toggleFormType} = userSlice.actions

export const userReducer =  userSlice.reducer