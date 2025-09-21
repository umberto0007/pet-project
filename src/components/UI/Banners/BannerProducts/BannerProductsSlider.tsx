import React from 'react';
import {Link} from 'react-router-dom';


import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from 'react-slick';

import settings from '#utils/SliderSettings/sliderSettingsBanner';
import {ChildProps} from '#types/models/product.types';


const BannerProductsSlider: React.FC<ChildProps> = ({products}) => {

    const severalProducts = products && (products.length <= 5
            ?
            products.slice(0, products.length)
            :
            products.slice(0, 5)
    )


    return (
        <Slider {...settings}>
            {severalProducts && severalProducts.map(({id, title, images}) =>
                <div key={id}>
                    <Link to={`beauty/${id}`} className='flex justify-evenly'>
                        <div className='mt-20'>
                            <h1 className='text-4xl mb-6 tracking-wide'>{title}</h1>
                            <span className='text-2xl text-yellow-500 uppercase tracking-wide'>скидка 30%</span>
                            <div className='text-2xl tracking-wide'> при покупке второго товара</div>
                        </div>
                        <picture>
                            <LazyLoadImage effect={'blur'} className='w-96 h-96' src={images && images[0]} alt='image'/>
                        </picture>
                    </Link>
                </div>
            )}
        </Slider>
    );
};

export default BannerProductsSlider;