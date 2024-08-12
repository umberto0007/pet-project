import React, {FC} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from 'react-router-dom';
import {ROUTES} from '../utils/routes';
import {productsApi} from '../store/dummyJson/products.api';
import Loader from './Loader';
import settings from '../utils/sliderSettingsBanner';


const BannerProducts: FC = () => {
    const {data: products, isLoading, isError} = productsApi.useGetProductsQuery('')
    const productsSlider = products && (products.length <= 5
            ?
            products.slice(0, products.length)
            :
            products.slice(0, 5)
    )

    console.log(products)

    return (
        <section className='bg-black text-white h-356 mt-10 rounded-lg'>
            {isLoading &&
                <Loader/>
            }
            {isError && <h1 className='text-center text-3xl pt-36 text-red-500'>Произошла ошибка при загрузке!</h1>}
            <Slider {...settings}>
                {productsSlider && productsSlider.map((product) =>
                    <div key={product.id}>
                        <Link to={ROUTES.PRODUCT} className='flex justify-center'>
                            <div className='mt-20'>
                                <h1 className='text-4xl mb-6'>{product.title}</h1>
                                <span className='text-2xl text-yellow-500 uppercase'>скидка 30%</span>
                                <div className='text-2xl'> при покупке второго товара</div>
                            </div>
                            <img className='w-96 h-96' src={product.images[0]} alt='image'/>
                        </Link>
                    </div>
                )}
            </Slider>
        </section>
    );
};

export default BannerProducts