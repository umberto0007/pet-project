import {useParams} from 'react-router-dom';

import {productsSliceApi} from '#redux/api/productsSlice.api';

import {usFirst} from '#utils/common';
import ProductCard from '#components/UI/CardTemplate/ProductCard';

import SkeletonCategoryPage from '#components/UI/Skeleton/SkeletonCategoryPage';
import HomePageErrorMassage from '#components/UI/Error/HomePageErrorMassage';


const CategoryPage = () => {
    const {slug} = useParams()

    const {data: products, isLoading, isError} = productsSliceApi.useGetCategoryPageQuery({slug})


    return (
        <section>
            {isError
                ?
                <HomePageErrorMassage/>
                :
                <article>
                    <h2 className='mt-6 text-3xl font-bold text-gray-800 tracking-wide'>{products && usFirst(products[0].category ? products[0].category : '')}
                        <span className='text-lg text-gray-400 font-normal ml-4'>{products && products.length}</span>
                    </h2>
                    <div className='flex mt-5'>
                        <div className='border min-w-52 mr-2'>
                            фильтры
                        </div>

                        <div className='flex flex-wrap gap-5'>
                            {isLoading
                                ?
                                <SkeletonCategoryPage/>
                                :
                                products && products.map((product) =>
                                    <ProductCard
                                        {...product}
                                        key={product.id}
                                    />
                                )
                            }
                        </div>
                    </div>
                </article>
            }
        </section>

    );
};

export default CategoryPage;