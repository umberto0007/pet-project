import {Link} from 'react-router-dom';

import {productsApi} from '#store/dummyJson/products.api';

import {ROUTES} from '#utils/routes';
import BASKET from '#assets/basket.svg'
import SkeletonHeaderNav from '#components/Skeleton/SkeletonHeaderNav';

const HeaderBasket = () => {
    const {isLoading} = productsApi.useGetCategoriesQuery('')

    return (
        <>
            {isLoading
                ?
                <SkeletonHeaderNav/>
                :
                <li>
                    <Link className='flex flex-col items-center max-w-16' to={ROUTES.CART}>
                       <img className='w-7 h-7' src={BASKET} alt='basket' />
                        <div className='mt-2'>Корзина</div>
                    </Link>
                </li>
            }
        </>
    );
};

export default HeaderBasket;