import {Link} from 'react-router-dom';

import {productsApi} from '#store/dummyJson/products.api';
import {ROUTES} from '#utils/routes';
import Slider from 'react-slick';
import settings from '#components/SliderSettings/sliderSettingsBanner';






const BannerProductsSlider = () => {

    const {data: products} = productsApi.useGetProductsQuery('')

    const severalProducts = products && (products.length <= 5
            ?
            products.slice(0, products.length)
            :
            products.slice(0, 5)
    )

    return (
        <Slider {...settings}>
            {severalProducts && severalProducts.map((product) =>
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
    );
};

export default BannerProductsSlider;