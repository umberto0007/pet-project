import React, {FC} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import settings from '../utils/sliderSettingsProducts';
import {productsApi} from '../store/dummyJson/products.api';
import SkeletonProducts from './Skeleton/SkeletonProducts';
import ProductCardBody from './ProductCardBody';




const DiscountProducts: FC = () => {

    const {data: discountProducts, isLoading} = productsApi.useGetProductsQuery('')


    return (
        <section className='mt-24'>
            <h2 className='text-2xl'>Скидки от 15% и больше</h2>
            {isLoading && (
                <div className='flex justify-between'>
                    {[...Array(5)].map((_, index) => (
                        <SkeletonProducts key={index}/>
                    ))}
                </div>
            )}

            <Slider  {...settings}>
                {discountProducts && discountProducts.map((product) =>
                    product.discountPercentage >= 15 &&
                    <ProductCardBody
                        {...product}
                        key={product.id}
                    />
                )}
            </Slider>
        </section>
    );
};

export default DiscountProducts