import {productsApi} from '#store/products/products.api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Loader from '#components/Loader/Loader';
import BannerProductsSlider from './BannerProductsSlider';


const BannerProducts = () => {

    const {data: products, isLoading} = productsApi.useGetProductsQuery('')



    return (
        <section className='bg-black text-white h-356 mt-10 rounded-lg'>
            {isLoading ? <Loader/> : <BannerProductsSlider products={products}/>}
        </section>
    );
};

export default BannerProducts