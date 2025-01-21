import {productsSliceApi} from '#redux/api/productsSlice.api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Loader from '#components/UI/Loader/Loader';
import BannerProductsSlider from './BannerProductsSlider';


const BannerProducts = () => {

    const {data: products, isLoading} = productsSliceApi.useGetProductsQuery('')



    return (
        <section className='bg-black text-white h-356 mt-16 rounded-lg'>
            {isLoading ? <Loader/> : <BannerProductsSlider products={products}/>}
        </section>
    );
};

export default BannerProducts