import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Product, ServerResponse} from '../../models/models';
import {BASE_URL} from '../../utils/constants';

export const dummyJsonApi = createApi({
    reducerPath: 'dummyJson/api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: builder => ({
        products: builder.query<ServerResponse<Product>, string>({
            query: (products: string) => ({
                url: 'products',
                params: {
                    q: products
                }
            })
        })
    })
})

export const {useProductsQuery} = dummyJsonApi