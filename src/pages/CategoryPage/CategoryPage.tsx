import {useParams} from 'react-router-dom';

import {productsSliceApi} from '#redux/api/productsSlice.api';

import HomePageErrorMassage from '#components/UI/Error/HomePageErrorMassage';
import CategoryContent from '#pages/CategoryPage/components/CategoryContent';
import {usFirst} from "#utils/common";


const CategoryPage = () => {
    const {slug} = useParams<{ slug: string }>()
    const {data: products, isLoading, isError} = productsSliceApi.useGetCategoryPageQuery({slug: slug ?? ''})


    return (
        <section>
            {isError
                ?
                <HomePageErrorMassage/>
                :
                <CategoryContent products={products} isLoading={isLoading}/>
            }
        </section>

    );
};

export default CategoryPage;