import {productsApi} from '#store/dummyJson/products.api';
import SkeletonProducts from '../Skeleton/SkeletonProducts';
import FurnitureSlider from '#components/Furniture/FurniturePart/FurnitureSlider';

const Furniture = () => {

    const { isLoading} = productsApi.useGetProductsQuery('')

    return (
        <section className='mt-24'>
            <h2 className='text-3xl font-bold text-gray-800'>Удобство и комфорт</h2>
            {isLoading ? <SkeletonProducts/> : <FurnitureSlider/>}
        </section>
    );
};

export default Furniture;