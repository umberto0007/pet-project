import React, {useState} from 'react';

import {useTypedSelector} from '#hooks/useTypedSelector';
import {StateProduct} from '#types/models/product.types';
import ToMainLink from '#pages/CartPage/ToMainLink';
import RegistrationButton from '#components/UI/Button/RegistrationButton';
import UserForm from '#components/Auth/User/UserForm';
import CartItemsList from '#pages/CartPage/CartItemsList';


const CartPage = () => {
    const {currentUser} = useTypedSelector(({user}) => user)
    const [formActive, setFormActive] = useState<boolean>(false);
    const {cart} = useTypedSelector(({user}: { user: StateProduct }) => user)

    const handleClick = () => {
        setFormActive(true);
    };

    return (
        <div className='mt-24'>
            {!currentUser
                ?
                <>
                    <h2 className='font-bold text-4xl text-grey tracking-wide'>Корзина пуста</h2>
                    <RegistrationButton
                        handleClick={handleClick}
                    />
                </>
                :
                cart.length > 0
                    ?
                    <CartItemsList/>
                    :
                    <>
                        <h2 className='font-bold text-4xl text-grey tracking-wide'>Корзина пуста</h2>
                        <ToMainLink/>
                    </>
            }
            <UserForm active={formActive} setActive={setFormActive}/>
        </div>
    );
};

export default CartPage;