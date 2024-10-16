import {useParams} from 'react-router-dom';

import {productsApi} from '#store/dummyJson/products.api';

import {usFirst} from '#utils/common';
import CategoryCardTemplate from '#components/CardTemplate/CategoryCardTemplate';

import SkeletonCategoryPage from '#components/Skeleton/SkeletonCategoryPage';
import HomePageErrorMassage from '#components/Error/HomePageErrorMassage';


const CategoryPage = () => {
    const {slug} = useParams()

    const {data: products, isLoading, isError} = productsApi.useGetCategoryPageQuery({slug})


    return (
        <>
            {isError ? <HomePageErrorMassage/> :
                <article>
                    <h2 className='mt-6 text-3xl font-bold text-gray-800'>{products && usFirst(products[0].category)}
                        <span className='text-lg text-gray-400 font-normal ml-4'>{products && products[0].stock}</span>
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
                                    <CategoryCardTemplate
                                        {...product}
                                        key={product.id}
                                    />
                                )
                            }
                        </div>
                    </div>
                </article>
            }
        </>

    );
};

export default CategoryPage;