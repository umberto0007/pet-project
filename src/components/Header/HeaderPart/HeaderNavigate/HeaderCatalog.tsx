import {productsApi} from '#store/dummyJson/products.api';

import CATALOG from '#assets/catalog.svg'
import SkeletonHeaderNav from '#components/Skeleton/SkeletonHeaderNav';


const HeaderCatalog = () => {
    const {isLoading} = productsApi.useGetCategoriesQuery('')

    return (
        <>
            {isLoading
                ?
                <SkeletonHeaderNav/>
                :
                <li className='flex flex-col items-center max-w-16'>
                    <img className='w-7 h-7' src={CATALOG} alt='catalog'/>
                    <div className='mt-2'>Каталог</div>
                </li>
            }
        </>
    );
};

export default HeaderCatalog;