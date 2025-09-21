import {createSlice} from '@reduxjs/toolkit';

import {User} from '#types/entities/user';
import {authSliceApi} from '#redux/api/authSlice.api';
import {IProduct, StateProduct} from '#types/models/product.types';


const userSlice = createSlice({
    name: 'user',
    initialState: <User>{
        currentUser: null,
        formType: 'signup',
        cart: []
    },
    reducers: {
        toggleFormType: (state, {payload}) => {
            state.formType = payload
        },
        addItemToCart: (state: StateProduct, {payload}: { payload: IProduct }) => {
            let newCart = [...state.cart]
            const found = state.cart.find(({id}) => id === payload.id)

            if (found) {
                newCart = newCart.map(item => {
                    return item.id === payload.id
                        ? {...item, quantity: payload.quantity || item.quantity && item.quantity + 1} : item
                })
            } else
                newCart.push({...payload, quantity: 1})
            state.cart = newCart
        },
        removeItemFromCart: (state: StateProduct, {payload}: { payload: IProduct }) => {
            const productIdToRemove = payload.id
            state.cart = state.cart.filter((item) => item.id !== productIdToRemove)
        },
        removeAllItemFromCart: (state: StateProduct) => {
            state.cart.length = 0
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authSliceApi.endpoints.createUser.matchFulfilled,
            (state, {payload}) => {
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
        builder.addMatcher(
            authSliceApi.endpoints.updateUser.matchFulfilled,
            (state, {payload}) => {
                state.currentUser = payload;
            }
        );
    },
});

export const {toggleFormType, addItemToCart, removeItemFromCart, removeAllItemFromCart} = userSlice.actions

export const userReducer = userSlice.reducer