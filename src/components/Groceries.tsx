import React from 'react';
import Slider from 'react-slick';
import settings from '../utils/sliderSettingsProducts';
import Skeleton from './Skeleton';
import {countReviews, discountPrice, titleLength} from '../utils/common';
import {FaStar} from 'react-icons/fa';
import BASKET from '../images/basket.svg';
import {productsApi} from '../store/dummyJson/products.api';

const Groceries = () => {

    const {data: products, isLoading} = productsApi.useGetProductsQuery('')

    return (
        <section className='mt-24'>
            <h2 className='text-2xl'>Продукты</h2>
            {isLoading && (
                <Slider {...settings}>
                    {[...Array(5)].map((_, index) => (
                        <Skeleton key={index}/>
                    ))}
                </Slider>
            )}

            <Slider {...settings}>
                {
                    products && products.map((
                        {
                            category,
                            title,
                            images,
                            id,
                            rating,
                            reviews,
                            price,
                            discountPercentage,
                        }) =>
                        category === 'groceries' &&
                        <article className='p-2' key={id}>
                            <img className='h-52' src={images[0]}/>
                            <div className='mt-5'>{titleLength(title)}</div>
                            <div className='flex items-center mt-2'>
                                {<FaStar fill='black'/>}
                                <div className='ml-1 mt-1'>{rating.toFixed(1)}</div>
                                <div className='ml-3 mt-1 text-gray-500'>{countReviews(reviews)}</div>
                            </div>
                            <div className='flex items-center gap-4 mt-5'>
                                <div className='text-2xl font-bold'>{discountPrice(price, discountPercentage)}</div>
                                <div className='line-through text-lg text-gray-500'>{Math.round(price * 10)}</div>
                                {discountPercentage < 5
                                    ?
                                    <span
                                        className='bg-gray-700 text-white rounded-md p-0.5 text-sm w-10 h-6 text-center pt-0.5'>{-30 + '%'}
                                    </span>
                                    :
                                    <span
                                        className='bg-gray-700 text-white rounded-md p-0.5 text-sm w-10 h-6 text-center pt-0.5'>{-Math.round(discountPercentage) + '%'}
                                    </span>
                                }
                            </div>
                            <button className='w-full border p-1 border-black rounded-lg mt-10'>
                                <img className='mx-auto' src={BASKET}/>
                            </button>
                        </article>
                    )
                }
            </Slider>
        </section>
    );
};

export default Groceries;