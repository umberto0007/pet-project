import React from 'react';
import {useProductsQuery} from '../store/dummyJson/dummyJson.api';

const HomePage = () => {
    const {isLoading, isError, data} = useProductsQuery('products')
    return (
        <div className='container px-20'>
            Home
        </div>
    );
};

export default HomePage;