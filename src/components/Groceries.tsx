import React from 'react';
import Slider from 'react-slick';
import settings from '../utils/sliderSettingsProducts';
import SkeletonProducts from './Skeleton/SkeletonProducts';
import {productsApi} from '../store/dummyJson/products.api';
import ProductCardBody from './ProductCardBody';

const Groceries = () => {

    const {data: products, isLoading} = productsApi.useGetProductsQuery('')

    return (
        <section className='mt-24'>
            <h2 className='text-2xl'>Продукты</h2>
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
                        product.category === 'groceries' &&
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

export default Groceries;