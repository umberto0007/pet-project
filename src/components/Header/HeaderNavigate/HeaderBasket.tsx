import React from 'react';
import {Link} from 'react-router-dom';

import {ROUTES} from '#utils/routes';
import {ReactComponent as BASKET} from '#assets/icons/basket.svg';
import SkeletonHeaderNav from '#components/Skeleton/SkeletonHeaderNav';
import {ChildProps} from '#types/models/product.types';

const HeaderBasket: React.FC<ChildProps> = ({isLoading}) => {

    return (
        <>
            {isLoading
                ?
                <SkeletonHeaderNav/>
                :
                <li className='w-24'>
                    <Link className='flex flex-col items-center py-2 hover:bg-grey-hov rounded-xl' to={ROUTES.CART}>
                        <BASKET className='[&>*:hover]:fill-gray-200 w-8 h-8'/>
                        <div className='mt-2 tracking-wide'>Корзина</div>
                    </Link>
                </li>
            }
        </>
    );
};

export default HeaderBasket;