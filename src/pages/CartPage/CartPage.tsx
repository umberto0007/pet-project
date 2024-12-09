import React, {useState} from 'react';

import {useTypedSelector} from '#hooks/useTypedSelector';
import EmptyToMainCart from '#pages/CartPage/EmptyToMainCart';
import EmptyAuthCart from '#pages/CartPage/EmptyAuthCart';


const CartPage = () => {
    const {currentUser} = useTypedSelector(({user}) => user)
    const [formActive, setFormActive] = useState<boolean>(false);

    const handleClick = () => {
        setFormActive(true);
    };

    return (
        <div className='mt-24'>
            <h1 className='font-bold text-4xl text-grey tracking-wide'>Корзина пуста</h1>
            {currentUser
                ?
                <EmptyToMainCart/>
                :
                <EmptyAuthCart
                    handleClick={handleClick}
                    active={formActive}
                    setActive={setFormActive}/>
            }
        </div>
    );
};

export default CartPage;