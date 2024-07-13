import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ArrowProps} from '../models/types';
import {Link} from 'react-router-dom';
import {ROUTES} from '../utils/routes';
import {useGetProductsQuery} from '../store/dummyJson/dummyJson.api';
import Loader from './Loader';

const SlSlider = () => {

    const {data: products, isLoading, isError} = useGetProductsQuery('')
    const productsSlider = products && (products.length <= 5
            ?
            products.slice(0, products.length)
            :
            products.slice(0, 5)
    )


    function SampleNextArrow(props: ArrowProps) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    background: 'transparent',
                    right: '25px',
                    zIndex: '1',
                    transform: 'scale(2)',
                    top: '40%'
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props: ArrowProps) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    background: 'transparent',
                    left: '25px',
                    zIndex: '1',
                    transform: 'scale(2)',
                    top: '40%'
                }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
    }

    return (
        <div className='bg-black text-white h-356 mt-10 rounded-lg'>
            {isLoading &&
                <Loader/>
            }
            {isError && <h1 className='text-center text-3xl pt-36'>Произошла ошибка при загрузке!</h1>}
            <Slider {...settings}>
                {productsSlider && productsSlider.map((product) =>
                    <div key={product.id}>
                        <Link to={ROUTES.PRODUCT} className='flex justify-center'>
                            <div className='mt-5'>
                                <div className='text-4xl mb-6'>{product.title}</div>
                                <span className='text-2xl text-yellow-500 uppercase'>скидка 30%</span>
                                <div className='text-2xl'> при покупке второго товара</div>
                            </div>
                            <img className='w-96 h-96' src={product.images[0]} alt='image'/>
                        </Link>
                    </div>
                )}
            </Slider>
        </div>
    );
};

export default SlSlider