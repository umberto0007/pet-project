import {productsSliceApi} from '#redux/api/productsSlice.api';
import SkeletonProducts from '#components/UI/Skeleton/SkeletonProducts';
import GroceriesSlider from './GroceriesSlider';



const Groceries = () => {

    const {data: products, isLoading} = productsSliceApi.useGetProductsQuery('')

    return (
        <section className='mt-24'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-wide'>Продукты</h2>
            {isLoading ? <SkeletonProducts/> : <GroceriesSlider products={products}/>}
        </section>
    );
};

export default Groceries;