import {Link} from 'react-router-dom';

import {productsApi} from '#store/dummyJson/products.api';

import {ROUTES} from '#utils/routes';
import {ReactComponent as BASKET} from '#assets/basket.svg';
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
                    <Link className='flex flex-col items-center p-2 hover:bg-grey-hov rounded-xl' to={ROUTES.CART}>
                        <BASKET className='[&>*:hover]:fill-gray-200'/>
                        <div className='mt-2'>Корзина</div>
                    </Link>
                </li>
            }
        </>
    );
};

export default HeaderBasket;