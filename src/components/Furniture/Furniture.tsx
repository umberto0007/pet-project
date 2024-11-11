import {productsApi} from '#store/products/products.api';
import SkeletonProducts from '../Skeleton/SkeletonProducts';
import FurnitureSlider from '#components/Furniture/FurnitureSlider';



const Furniture = () => {

    const {data: products, isLoading} = productsApi.useGetProductsQuery('')

    return (
        <section className='mt-24'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-wide'>Удобство и комфорт</h2>
            {isLoading ? <SkeletonProducts/> : <FurnitureSlider products={products}/>}
        </section>
    );
};

export default Furniture;