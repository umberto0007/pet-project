import React from 'react';
import {productsApi} from '#store/dummyJson/products.api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import FragrancesSlider from './FragrancesPart/FragrancesSlider';
import SkeletonProducts from '#components/Skeleton/SkeletonProducts';

const Fragrances = () => {

    const {isLoading} = productsApi.useGetProductsQuery('')

    return (
        <section className='mt-24'>
            <h2 className='text-3xl font-bold text-gray-800'>Ароматы</h2>
            {isLoading ? <SkeletonProducts/> : <FragrancesSlider/>}
        </section>
    );
};

export default Fragrances;