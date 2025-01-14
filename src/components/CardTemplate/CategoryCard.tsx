import React from 'react';
import {Link, useParams} from 'react-router-dom';

import {FaStar} from 'react-icons/fa';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Button from '#components/UI/Button';
import {IProduct} from '#types/models/product.types';
import {discountPrice, strLength} from '#utils/common';
import stub from '#assets/stub/stub.webp'


const CategoryCard: React.FC<IProduct> =
    ({
         id,
         discountPercentage,
         images,
         title,
         rating,
         stock,
         price,
     }) => {

        const {slug} = useParams()

        return (

            <Link to={`/${slug}/${id}`} className='flex flex-col justify-between p-5 w-64'>
                <LazyLoadImage placeholderSrc={stub} className='max-h-48 w-auto mx-auto' src={images?.[0]}/>
                <div className='mt-5 text-lg font-medium tracking-wide'>{strLength(title ?? '', 20)}</div>
                <div className='flex items-center mt-2'>
                    {<FaStar fill='black'/>}
                    <div className='ml-1 mt-1'>{rating?.toFixed(1)}</div>
                    {
                        (stock ?? 0) > 30
                            ?
                            <div className='ml-3 mt-1 text-green-500 tracking-wide'>в наличии</div>
                            :
                            <div className='ml-3 mt-1 text-red-500 tracking-wide'>осталось мало</div>
                    }
                </div>
                <div className='flex items-center gap-4 mt-5'>
                    <div
                        className='text-2xl font-bold'>{discountPrice(price ?? 0, discountPercentage ?? 0) + ' ₽'}</div>
                    <div className='line-through text-lg text-gray-500'>{Math.round((price ?? 0) * 10)}</div>
                    {
                        (discountPercentage ?? 0) < 5
                            ?
                            <span
                                className='bg-gray-700 text-white rounded-md p-0.5 text-sm w-10 h-6 text-center pt-0.5'>{-30 + '%'}
                            </span>
                            :
                            <span
                                className='bg-gray-700 text-white rounded-md p-0.5 text-sm w-10 h-6 text-center pt-0.5'>{-Math.round(discountPercentage ?? 0) + '%'}
                            </span>
                    }
                </div>
                <Button/>
            </Link>
        );
    };

export default CategoryCard;