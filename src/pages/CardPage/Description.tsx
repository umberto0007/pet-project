import React from 'react';

import {FaStar} from 'react-icons/fa';

import {discountPrice} from '#utils/common';
import {ChildProps, IProduct} from '#types/models/product.types';
import BASKET from '#assets/icons/basket.svg';
import {useDispatch} from 'react-redux';
import {addItemToCart} from '#redux/features/user/userSlice';


const Description: React.FC<ChildProps> = ({product = {} as IProduct}) => {

    const dispatch = useDispatch()


    const {
        sku,
        title,
        rating,
        stock,
        price,
        description,
        discountPercentage
    } = product

    const addToCart = () => {
        dispatch(addItemToCart(product))
    }

    return (
        <>
            <div>
                <h1 className='text-4xl font-bold tracking-wide'>{title}</h1>
                <div className='flex items-center gap-10'>
                    <div
                        className='mt-4 text-gray-500 text-md'>Артикул: {sku}</div>
                    <div className='flex items-center mt-2'>
                        {<FaStar fill='black'/>}
                        <div className='ml-1 mt-1'>{rating?.toFixed(1)}</div>
                        {(stock ?? 0) > 30 ?
                            <div className='ml-3 mt-1 text-green-500 tracking-wide'>в наличии</div> :
                            <div className='ml-3 mt-1 text-red-500 tracking-wide'>осталось мало</div>}
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-32'>
                <div>
                    <div className='flex items-center gap-4'>
                        <div
                            className='line-through text-4xl text-gray-500'>{Math.round((price ?? 0) * 10)}</div>
                        {(discountPercentage ?? 0) < 5
                            ?
                            <span
                                className='bg-gray-700 text-white rounded-md  text-lg w-12 h-7 text-center p-0.5'>{-30 + '%'}
                                                </span>
                            :
                            <span
                                className='bg-gray-700 text-white rounded-md  text-lg w-12 h-7 text-center p-0.5'>{-Math.round(discountPercentage ?? 0) + '%'}
                                                </span>
                        }
                    </div>
                    <div
                        className='text-4xl font-bold mt-3'>{discountPrice(price ?? 0, discountPercentage ?? 0) + ' ₽'}</div>
                </div>
                <button onClick={addToCart} className='w-48 bg-blue-100 p-2 rounded-lg hover:bg-blue-200'>
                    <div className='flex items-center justify-center gap-4 py-1'>
                        <img src={BASKET} alt='basket'/>
                        <span className='text-2xl tracking-wide'>В корзину</span>
                    </div>
                </button>
            </div>
            <div>
                <h3 className='font-bold text-3xl tracking-wide'>Описание</h3>
                <p className='mt-5 text-2xl tracking-wide'>{description}</p>
            </div>
        </>
    )
        ;
};

export default Description;