import React, {FC} from 'react';
import {productsApi} from '../store/dummyJson/products.api';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import settings from '../utils/sliderSettingsProducts';
import {FaStar} from "react-icons/fa";
import {countReviews, discountPrice, titleLength} from '../utils/common';
import BASKET from '../images/basket.svg'


const DiscountProducts: FC = () => {
    const {data: discountProducts, isError, isLoading} = productsApi.useGetProductsQuery('')


    return (
        <section className='mt-24'>
            <h2 className='text-2xl'>Скидки от 15% и больше</h2>
            <Slider  {...settings}>
                {discountProducts && discountProducts.map((
                    {
                        discountPercentage,
                        id,
                        images,
                        title,
                        rating,
                        price,
                        reviews
                    }) =>
                    discountPercentage >= 15 &&
                    <article className='p-2' key={id}>
                        <img src={images[0]}/>
                        <div className='mt-5'>{titleLength(title)}</div>
                        <div className='flex items-center mt-2'>
                            {<FaStar fill='black'/>}
                            <div className='ml-1 mt-1'>{rating.toFixed(1)}</div>
                            <div className='ml-3 mt-1 text-gray-500'>{countReviews(reviews)}</div>
                        </div>
                        <div className='flex items-center gap-4 mt-5'>
                            <div className='text-2xl font-bold'>{discountPrice(price, discountPercentage)}</div>
                            <div className='line-through text-lg text-gray-500'>{Math.round(price)}</div>
                            <span
                                className='bg-gray-700 text-white rounded-md p-0.5 text-sm'>{-Math.round(discountPercentage) + '%'}
                            </span>
                        </div>
                            <button className='w-full border p-1 border-black rounded-lg mt-10'>
                                <img className='mx-auto' src={BASKET}/>
                            </button>
                    </article>
                )}
            </Slider>
        </section>
    );
};

export default DiscountProducts