import {useParams} from 'react-router-dom';

import {productsSliceApi} from '#redux/api/productsSlice.api';
import HomePageErrorMassage from '#components/UI/Error/HomePageErrorMassage';
import SkeletonCardPage from '#components/UI/Skeleton/SkeletonCardPage';
import OneImageProduct from '#pages/CardPage/OneImageProduct';
import SomeImagesProduct from '#pages/CardPage/SomeImagesProduct';
import Reviews from '#pages/CardPage/Reviews';

const CardPage = () => {
    const {id} = useParams()
    const {data: product, isLoading, isError} = productsSliceApi.useGetProductPageQuery({id})

    return (
        <>
            {
                isError
                    ?
                    <HomePageErrorMassage/>
                    :
                    <article>
                        <h2 className='text-3xl font-bold text-gray-800 mt-6 tracking-wide'>Карточка товара</h2>
                        {isLoading
                            ?
                            <SkeletonCardPage/>
                            :
                            product?.images?.length === 1
                                ?
                                <OneImageProduct product={product}/>
                                :
                                <SomeImagesProduct product={product}/>
                        }
                        <Reviews/>
                    </article>
            }
        </>
    );
};

export default CardPage;