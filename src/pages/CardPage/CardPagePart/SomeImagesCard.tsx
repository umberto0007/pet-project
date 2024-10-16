import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {FaStar} from 'react-icons/fa';
import {discountPrice} from '#utils/common';
import BASKET from '#assets/basket.svg';
import {productsApi} from '#store/dummyJson/products.api';
import {useParams} from 'react-router-dom';

const SomeImagesCard = () => {
    const {id} = useParams()
    const {data: product} = productsApi.useGetProductPageQuery({id})
    const [currentImg, setCurrentImg] = useState(product && product.images[0])

    useEffect(() => {
        if (product && !product.images) return
        setCurrentImg(product && product.images[0])
    }, [product && product.images])

    return (
        <div className='mt-5 flex gap-10 justify-between'>
            <div className='flex gap-5'>
                <div className='flex flex-col items-center gap-5 w-20 h-20'>
                    {product && product.images.map((image) =>
                        <img
                            key={uuidv4()}
                            className='cursor-pointer shadow-md'
                            src={image}
                            onClick={() => setCurrentImg(image)}
                        />
                    )}
                </div>
                <img src={currentImg} className='max-w-640 shadow-md'/>
            </div>
            <div className='flex flex-col justify-between w-2/3'>
                <div>
                    <h2 className='text-4xl font-bold'>{product && product.title}</h2>
                    <div className='flex items-center gap-10'>
                        <div
                            className='mt-4 text-gray-500 text-md'>Артикул: {product && product.sku}</div>
                        <div className='flex items-center mt-2'>
                            {<FaStar fill='black'/>}
                            <div className='ml-1 mt-1'>{product && product.rating.toFixed(1)}</div>
                            {product && product.stock > 30 ?
                                <div className='ml-3 mt-1 text-green-500'>в наличии</div> :
                                <div className='ml-3 mt-1 text-red-500'>осталось мало</div>}
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-32'>
                    <div>
                        <div className='flex items-center gap-4'>
                            <div
                                className='line-through text-4xl text-gray-500'>{product && Math.round(product.price * 10)}</div>
                            {product && product.discountPercentage < 5
                                ?
                                <span
                                    className='bg-gray-700 text-white rounded-md  text-lg w-12 h-7 text-center p-0.5'>{-30 + '%'}
                                                </span>
                                :
                                <span
                                    className='bg-gray-700 text-white rounded-md  text-lg w-12 h-7 text-center p-0.5'>{product && -Math.round(product.discountPercentage) + '%'}
                                                </span>
                            }
                        </div>
                        <div
                            className='text-4xl font-bold mt-3'>{product && discountPrice(product.price, product.discountPercentage)}</div>
                    </div>
                    <button className='w-48 bg-blue-100 p-3 rounded-lg hover:bg-blue-200'>
                        <div className='flex items-center justify-center gap-6'>
                            <img src={BASKET}/>
                            <span className='text-2xl'>В корзину</span>
                        </div>
                    </button>
                </div>
                <div>
                    <h3 className='font-bold text-3xl'>Описание</h3>
                    <p className='mt-5 text-2xl'>{product && product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default SomeImagesCard;