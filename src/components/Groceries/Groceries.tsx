import {productsApi} from '#store/dummyJson/products.api';
import SkeletonProducts from '../Skeleton/SkeletonProducts';
import GroceriesSlider from './GroceriesPart/GroceriesSlider';

const Groceries = () => {

    const { isLoading} = productsApi.useGetProductsQuery('')

    return (
        <section className='mt-24'>
            <h2 className='text-3xl font-bold text-gray-800'>Продукты</h2>
            {isLoading ? <SkeletonProducts/> : <GroceriesSlider/>}
        </section>
    );
};

export default Groceries;