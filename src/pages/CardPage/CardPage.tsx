import {useParams} from 'react-router-dom';

import {FaStar} from 'react-icons/fa';
import {v4 as uuidv4} from 'uuid';

import {productsApi} from '#store/dummyJson/products.api';
import {dataReview, discountPrice} from '#utils/common';
import BASKET from '#assets/basket.svg';


const CardPage = () => {

    const {id} = useParams()

    const {data: product, isLoading} = productsApi.useGetProductPageQuery({id})


    return (
        <article>
            <h2 className='text-3xl font-bold text-gray-800 mt-6'>Карточка товара</h2>
            <div className='mt-5 flex gap-10 justify-between'>
                <img className='max-w-640 max-h-640 shadow-md' src={product && product.images[0]}/>
                <div className='flex flex-col justify-between w-2/3'>
                    <div>
                        <h2 className='text-4xl font-bold'>{product && product.title}</h2>
                        <div className='flex items-center gap-10'>
                            <div className='mt-4 text-gray-500 text-md'>Артикул: {product && product.sku}</div>
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
            <h2 className='text-3xl font-bold text-gray-800 mt-24'>Отзывы</h2>
            <div className='flex justify-between mt-10'>
                {product && product.reviews.map(({reviewerName, date, rating, comment}) =>
                    <div key={uuidv4()} className='min-w-96 min-h-40 rounded-lg shadow-md p-5'>
                        <div className='flex gap-5'>
                            <div className='font-bold'>{reviewerName}</div>
                            <div className='text-gray-400'>{dataReview(date)}</div>
                        </div>
                        <div className='flex items-center gap-2 mt-4'>
                            {<FaStar fill='black'/>}
                            <div className='pt-0.5'>{rating}</div>
                        </div>
                        <h4 className='mt-4 font-bold'>Комметарий</h4>
                        <p className='mt-2'>{comment}</p>
                    </div>
                )}
            </div>
        </article>
    );
};

export default CardPage;