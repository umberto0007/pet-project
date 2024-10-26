import React from 'react';

import {FaStar} from 'react-icons/fa';

import {IProduct} from '#models/product.types';
import {discountPrice, titleLength} from '#utils/common';
import Button from '#components/UI/Button';


const ProductCardTemplate: React.FC<IProduct> =
    ({
         discountPercentage,
         images,
         title,
         rating,
         price,
         stock,
     }) => {
        return (
            <div className='p-5 flex flex-col justify-between w-64 mt-8'>
                <img className='h-48 mx-auto' src={images[0]}/>
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
                <Button/>
            </div>
        );
    };

export default ProductCardTemplate;