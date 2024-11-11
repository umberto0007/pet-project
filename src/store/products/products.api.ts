import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BASE_URL} from '#utils/constants';
import {IProduct, ICategories, ServerResponse, ICatalogMenu} from '#models/product.types';




export const productsApi = createApi({
    reducerPath: 'products/api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: builder => ({
        getProducts: builder.query<IProduct[], string>({
            query: () => 'products',
            transformResponse: (response: ServerResponse<IProduct>) => response.products,
        }),
        getCategories: builder.query<ICategories[], string>({
            query: () => 'products/categories',
        }),
        getCatalogMenu: builder.query<ICatalogMenu[], string>({
            query: () => 'c/700f-1abf-4194-a388'
        }),
        getCategoryPage: builder.query<IProduct[], any>({
            query: ({slug}) => `/products/category/${slug}`,
            transformResponse: (response: ServerResponse<IProduct>) => response.products,
        }),
        getProductPage: builder.query<IProduct, any>({
            query: ({id}) => `/products/${id}`
        })
    }),
})

