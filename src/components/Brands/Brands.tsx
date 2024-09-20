import BrandsList from './BrandsPart/BrandsList';
import {productsApi} from '#store/dummyJson/products.api';
import SkeletonBrands from '#components/Skeleton/SkeletonBrands';


const Brands = () => {

    const {isLoading} = productsApi.useGetBrandsQuery('')

    return (
        <section className='mt-24'>
            <h2 className='text-3xl font-bold text-gray-800'>Популярные бренды</h2>
            <div className='flex gap-4 flex-wrap mt-8 justify-center'>
                {isLoading ? <SkeletonBrands/> : <BrandsList/>}
            </div>
        </section>
    );
};

export default Brands;