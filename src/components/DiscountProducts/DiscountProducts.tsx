import React, {FC} from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SkeletonProducts from '../Skeleton/SkeletonProducts';
import DiscountProductsSlider from './DiscountProductsPart/DiscountProductsSlider';
import {productsApi} from '#store/dummyJson/products.api';


const DiscountProducts: FC = () => {

    const {isLoading} = productsApi.useGetProductsQuery('')


    return (
        <section className='mt-24'>
            <h2 className='text-2xl'>Скидки от 15% и больше</h2>
            {isLoading ? <SkeletonProducts/> : <DiscountProductsSlider/>}
        </section>
    );
};

export default DiscountProducts