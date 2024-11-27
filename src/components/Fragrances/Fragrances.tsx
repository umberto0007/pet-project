import React from 'react';
import {productsSliceApi} from '#redux/api/productsSlice.api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import FragrancesSlider from './FragrancesSlider';
import SkeletonProducts from '#components/Skeleton/SkeletonProducts';

const Fragrances = () => {

    const {data: products, isLoading} = productsSliceApi.useGetProductsQuery('')

    return (
        <section className='mt-24'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-wide'>Ароматы</h2>
            {isLoading ? <SkeletonProducts/> : <FragrancesSlider products={products}/>}
        </section>
    );
};

export default Fragrances;