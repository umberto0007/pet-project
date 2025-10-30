import React from 'react';

import {Link} from 'react-router-dom';

import Loader from '#components/UI/Loader/Loader';
import {ChildProps} from '#types/models/product.types';
import {discountPrice} from "#utils/common";
import {LazyLoadImage} from "react-lazy-load-image-component";
import stub from "#assets/stub/stub.webp";


const BannerCalvinKlein: React.FC<ChildProps> = ({products}) => {

    return (
        <>
            {products && products.length > 0 ?
                <section className='mt-24 bg-purple-100 rounded-lg'>
                    <Link to={`/fragrances/${products[5].id}`} className='flex'>
                        <div className='flex flex-col p-10'>
                            <h2 className='text-4xl mt-10 text-purple-900 tracking-wide'>{products[5].title}</h2>
                            <h3 className='text-2xl mt-10 text-grey font-light tracking-wide'>{products[5].description}</h3>
                            <div className='mt-12 bg-yellow-400 max-w-96 text-2xl p-2 rounded'>
                                Только у нас всего за
                                <span className='text-red-700 ml-3'>
                                    {discountPrice(products[5].price ?? 0, products[5].discountPercentage ?? 0) }
                                </span> ₽
                            </div>
                            <div className='mt-12 bg-blue-300 max-w-80 text-2xl p-2 rounded'>Купите сегодня и получите
                                скидку {(products[5]?.discountPercentage ?? 0) * 100 - 2} %
                            </div>
                        </div>
                        <LazyLoadImage
                            threshold={200}
                            className='w-2/5'
                            src={products?.[5]?.images?.[2] ?? stub}
                            alt="calvinKlain"
                        />
                    </Link>
                </section>
                :
                <Loader/>
            }
        </>
    );
};

export default BannerCalvinKlein;