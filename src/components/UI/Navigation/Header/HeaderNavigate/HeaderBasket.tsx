import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import {ROUTES} from '#utils/routes';
import {ReactComponent as BASKET} from '#assets/icons/basket.svg';
import SkeletonHeaderNav from '#components/UI/Skeleton/SkeletonHeaderNav';
import {ChildProps, StateProduct} from '#types/models/product.types';
import {useTypedSelector} from '#hooks/useTypedSelector';
import {getTotalItemsInCart} from '#utils/common';
import CartModal from '#pages/CartPage/CartModal';


const HeaderBasket: React.FC<ChildProps> = ({isLoading}) => {
    const location = useLocation()
    const [formActive, setFormActive] = useState<boolean>(false);
    const {cart} = useTypedSelector(({user}: { user: StateProduct }) => user)


    useEffect(() => {
        if (cart.length > 0) {
            setFormActive(true)
            const timer = setTimeout(() => {
                setFormActive(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [cart]);



    const handleMouseEnter = () => {
        if (cart.length > 0) {
            setFormActive(true);
        }
    };

    const handleMouseLeave = () => {
        setFormActive(false)
    };


    return (
        <div onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
        >
            {isLoading
                ?
                <SkeletonHeaderNav/>
                :
                <li className='w-20 relative'>
                    <Link className='flex flex-col items-center py-2 hover:bg-grey-hov rounded-xl relative'
                          to={ROUTES.CART}>
                        <BASKET className='[&>*:hover]:fill-gray-200 w-8 h-8'/>
                        <div className='mt-2 tracking-wide'>Корзина</div>
                        {!!cart.length && (
                            <span
                                className='absolute w-5 h-5 -right-0.5 -top-0.5 text-[14px] text-center leading-5 rounded-[50%] bg-purple-800 text-white'>{getTotalItemsInCart(cart)}</span>
                        )}
                    </Link>
                    {
                        location.pathname !== '/cart'
                            ?
                            <CartModal
                                active={formActive}
                            />
                            :
                            null
                    }
                </li>
            }
        </div>
    );
};

export default HeaderBasket;