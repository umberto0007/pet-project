import React from 'react';
import {productsApi} from '#store/dummyJson/products.api';
import Loader from '#components/Loader/Loader';



const BannerIceCream = () => {
    const {data: products, isLoading} = productsApi.useGetProductsQuery('')

    return (
        <>
            {isLoading
                ?
                <Loader/>
                :
                <section className='rounded-lg bg-gradient-to-r from-pink-500 mt-24'>
                    <div className='flex'>
                        <div className='flex flex-col ml-5'>
                            <h2 className='text-4xl mt-28 text-white'>{products && products[27].title}</h2>
                            <h3 className='text-2xl mt-10 font-light text-white'>{products && products[27].description}</h3>
                            <div className="bg-gradient-to-r from-yellow-300 mt-20 rounded-lg p-3 w-2/3">
                                <div className='text-2xl'>При заказе онлайн даем скидку!</div>
                            </div>
                            <div
                                className='p-3 border w-1/5 mt-10 rounded-lg text-center uppercase text-lg cursor-pointer text-white'>Купить
                            </div>
                        </div>
                        <img className='w-2/5' src={products && products[27].images[2]} alt="iceCream"/>
                    </div>
                </section>
            }
        </>
    );
};

export default BannerIceCream;