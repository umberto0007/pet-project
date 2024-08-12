import React from 'react';
import {productsApi} from '../store/dummyJson/products.api';


const BannerCalvinKlein = () => {
    const {data: products} = productsApi.useGetProductsQuery('')

    return (
        <section className='bg-purple-100 rounded-lg mt-24'>
            <div className='flex'>
                <div className='flex flex-col ml-5'>
                    <h2 className='text-4xl mt-28 text-purple-900'>{products && products[5].title}</h2>
                    <h3 className='text-2xl mt-10 text-grey font-light'>{products && products[5].description}</h3>
                    <div className='mt-12 bg-yellow-400 max-w-80 text-2xl p-1 rounded'>
                        Только у нас всего за
                        <span className='text-red-700 ml-3'>
                        {products && Math.round(products[5].price)}
                        </span> $
                    </div>
                    <div className='mt-12 bg-blue-300 max-w-80 text-2xl p-1 rounded'>Купите сегодня и получите
                        скидку {products && products[5].discountPercentage * 100 - 2} %
                    </div>
                </div>
                <img className='w-2/5' src={products && products[5].images[2]} alt="calvinKlain"/>
            </div>
        </section>
    );
};

export default BannerCalvinKlein;