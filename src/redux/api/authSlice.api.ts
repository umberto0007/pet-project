import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {AUTH_URL} from '#utils/constants';
import {CreateUser, AuthProfileResponse, LoginUser} from '#types/entities/user';


let access_token: string | null = null;

export const setAccessToken = (token: string) => {
    access_token = token;
};


export const authSliceApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: AUTH_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            if (access_token) {
                headers.set('Authorization', `Bearer ${access_token}`);
            }
            return headers
        }
    }),
    endpoints: builder => ({
        createUser: builder.mutation<CreateUser, CreateUser>({
            query: (body) => {
                return {
                    url: 'users',
                    method: 'post',
                    body
                }
            },
        }),
        loginUser: builder.mutation<AuthProfileResponse, LoginUser>({
            query: (body) => {
                return {
                    url: 'auth/login',
                    method: 'post',
                    body
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    setAccessToken(data.access_token)
                    const profileResult: any = await dispatch(authSliceApi.endpoints.getProfile.initiate(undefined));
                    return profileResult.data
                } catch (error) {
                    console.error('Ошибка при попытке входа:', error);
                }
            }
        }),
        getProfile: builder.query<AuthProfileResponse, void>({
            query: () => `auth/profile`,
        }),
        updateUser: builder.mutation<CreateUser, CreateUser>({
            query: (payload) => ({
                url: `users/${payload.id}`,
                method: 'put',
                body: payload
            })
        })
    })
})

