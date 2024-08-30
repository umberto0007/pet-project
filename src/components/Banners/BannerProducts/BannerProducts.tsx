import React, {FC} from 'react';

import {productsApi} from '#store/dummyJson/products.api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Loader from '#components/Loader/Loader';
import BannerProductsSlider from './BannerProductsPart/BannerProductsSlider';




const BannerProducts: FC = () => {

    const {isLoading} = productsApi.useGetProductsQuery('')

    return (
        <section className='bg-black text-white h-356 mt-10 rounded-lg'>
            {isLoading ? <Loader/> : <BannerProductsSlider/>}
        </section>
    );
};

export default BannerProducts