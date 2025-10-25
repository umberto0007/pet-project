import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import BannerProductsSlider from './BannerProductsSlider';
import {ChildProps} from "#types/models/product.types";
import SkeletonBanner from "#components/UI/Skeleton/SkeletonBanner";


const BannerProducts: React.FC<ChildProps> = ({products}) => {

    return (
        <section className='bg-black text-white h-356 mt-16 rounded-lg'>
            {products && products.length > 0
                ?
                <BannerProductsSlider products={products}/>
                :
                <SkeletonBanner/>
            }
        </section>
    );
};

export default BannerProducts