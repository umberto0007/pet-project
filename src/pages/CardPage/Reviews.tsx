import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {dataReview} from '#utils/common';
import {FaStar} from 'react-icons/fa';
import {useParams} from 'react-router-dom';
import {productsSliceApi} from '#redux/api/productsSlice.api';

const Reviews = () => {
    const {id} = useParams()
    const {data: product} = productsSliceApi.useGetProductPageQuery({id})

    return (
        <>
            <h2 className='text-3xl font-bold text-gray-800 mt-24 tracking-wide'>Отзывы</h2>
            <div className='flex justify-between mt-10'>
                {product && product.reviews.map(({reviewerName, date, rating, comment}) =>
                    <div key={uuidv4()} className='min-w-96 min-h-40 rounded-lg shadow-md p-5'>
                        <div className='flex gap-5'>
                            <div className='font-bold tracking-wide'>{reviewerName}</div>
                            <div className='text-gray-400'>{dataReview(date)}</div>
                        </div>
                        <div className='flex items-center gap-2 mt-4'>
                            {<FaStar fill='black'/>}
                            <div className='pt-0.5'>{rating}</div>
                        </div>
                        <h4 className='mt-4 font-bold tracking-wide'>Комметарий</h4>
                        <p className='mt-2 tracking-wide'>{comment}</p>
                    </div>
                )}
            </div>
        </>
    )
        ;
};

export default Reviews;