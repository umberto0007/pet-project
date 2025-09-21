import {useParams} from 'react-router-dom';

import {productsSliceApi} from '#redux/api/productsSlice.api';
import {usFirst} from '#utils/common';
import HomePageErrorMassage from '#components/UI/Error/HomePageErrorMassage';
import CategoryContent from '#pages/CategoryPage/CategoryContent';



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
                    <div className='flex mt-8'>
                        <CategoryContent products={products} isLoading={isLoading}/>
                    </div>
                </article>
            }
        </section>

    );
};

export default CategoryPage;