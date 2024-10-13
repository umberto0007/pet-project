import React from 'react';
import {Link, useParams} from 'react-router-dom';

import {FaStar} from 'react-icons/fa';

import {IProduct} from '#models/product.types';
import {discountPrice, titleLength} from '#utils/common';
import BASKET from '#assets/basket.svg';


const CategoryCardTemplate: React.FC<IProduct> =
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
                <img className='max-h-48 w-auto mx-auto ' src={images[0]}/>
                <div className='mt-5 text-lg font-medium'>{titleLength(title)}</div>
                <div className='flex items-center mt-2'>
                    {<FaStar fill='black'/>}
                    <div className='ml-1 mt-1'>{rating.toFixed(1)}</div>
                    {stock > 30 ? <div className='ml-3 mt-1 text-green-500'>в наличии</div> :
                        <div className='ml-3 mt-1 text-red-500'>осталось мало</div>}
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
                <button className='bg-blue-100 p-2 rounded-lg mt-10 w-full hover:bg-blue-200'>
                    <div className='flex items-center justify-center gap-3'>
                        <img src={BASKET}/>
                        <span className='text-lg'>В корзину</span>
                    </div>
                </button>
            </Link>
        );
    };

export default CategoryCardTemplate;