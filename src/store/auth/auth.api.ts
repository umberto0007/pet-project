import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AUTH_URL} from '#utils/constants';
import {UserBodyType} from '#entities/user';



export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: AUTH_URL
    }),
    endpoints: builder => ({
        createUser: builder.mutation<void, UserBodyType>({
            query: (body) => {
                return {
                    url: 'users',
                    method: 'post',
                    body
                }
            }
        }),
        loginUser: builder.mutation<void, UserBodyType>({
            query: (body) => {
                return {
                    url: 'auth/login',
                    method: 'post',
                    body
                }
            }
        }),
    })
})