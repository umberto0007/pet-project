import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IProduct, ICategories, ServerResponse} from '../../models/product.types';
import {BASE_URL} from '../../utils/constants';
import {BaseQueryArg} from '@reduxjs/toolkit/dist/query/baseQueryTypes';


export const productsApi = createApi({
    reducerPath: 'products/api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: builder => ({
        getProducts: builder.query<IProduct[], string>({
            query: () => 'products',
            transformResponse: (response: ServerResponse<IProduct>) => response.products
        }),
        getCategories: builder.query<ICategories[], string>({
            query: () => 'products/categories'
        }),
    }),
})

