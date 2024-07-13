import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IProduct, ServerResponse} from '../../models/models';
import {BASE_URL} from '../../utils/constants';


export const dummyJsonApi = createApi({
    reducerPath: 'dummyJson/api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: builder => ({
        getProducts: builder.query<IProduct[], string>({
            query: () => 'products',
            transformResponse: (response: ServerResponse<IProduct>) => response.products
        })
    })
})

export const {useGetProductsQuery} = dummyJsonApi