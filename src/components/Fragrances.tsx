import React from 'react';
import {productsApi} from '../store/dummyJson/products.api';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import settings from '../utils/sliderSettingsProducts';
import SkeletonProducts from './Skeleton/SkeletonProducts';
import ProductCardBody from './ProductCardBody';

const Fragrances = () => {

    const {data: products, isLoading} = productsApi.useGetProductsQuery('')

    return (
        <section className='mt-24'>
            <h2 className='text-2xl'>Ароматы</h2>
            {isLoading && (
                <Slider {...settings}>
                    {[...Array(5)].map((_, index) => (
                        <SkeletonProducts key={index}/>
                    ))}
                </Slider>
            )}

            <Slider {...settings}>
                {
                    products && products.map((product) =>
                        product.category === 'fragrances' &&
                        <ProductCardBody
                            {...product}
                            key={product.id}
                        />
                    )
                }
            </Slider>
        </section>
    );
};

export default Fragrances;