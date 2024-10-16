import {useParams} from 'react-router-dom';

import {productsApi} from '#store/dummyJson/products.api';
import HomePageErrorMassage from '#components/Error/HomePageErrorMassage';
import SkeletonCardPage from '#components/Skeleton/SkeletonCardPage';
import OneImageCard from '#pages/CardPage/CardPagePart/OneImageCard';
import SomeImagesCard from '#pages/CardPage/CardPagePart/SomeImagesCard';
import Reviews from '#pages/CardPage/CardPagePart/Reviews';


const CardPage = () => {

    const {id} = useParams()

    const {data: product, isLoading, isError} = productsApi.useGetProductPageQuery({id})


    return (
        <>
            {
                isError ? <HomePageErrorMassage/> :
                    <article>
                        <h2 className='text-3xl font-bold text-gray-800 mt-6'>Карточка товара</h2>
                        {isLoading
                            ?
                            <SkeletonCardPage/>
                            :
                            product && product.images.length === 1 ? <OneImageCard/> : <SomeImagesCard/>
                        }
                        <Reviews/>
                    </article>
            }
        </>
    );
};

export default CardPage;