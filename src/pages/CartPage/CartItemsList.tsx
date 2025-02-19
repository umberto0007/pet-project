import {useDispatch} from 'react-redux';

import {getTotalItemsInCart} from '#utils/common';
import {removeAllItemFromCart} from '#redux/features/user/userSlice';
import {useTypedSelector} from '#hooks/useTypedSelector';
import {StateProduct} from '#types/models/product.types';
import CartItemInfo from '#pages/CartPage/CartItemInfo';
import CartTotalPrice from '#pages/CartPage/CartTotalPrice';

const CartItemsList = () => {
    const {cart} = useTypedSelector(({user}: { user: StateProduct }) => user)
    const dispatch = useDispatch()

    const removeAllItem = () => {
        dispatch(removeAllItemFromCart())
    }

    return (
        <>
            <div className='flex items-center justify-between mb-7'>
                <h2 className='font-bold text-4xl text-grey tracking-wide'>
                    Корзина
                    <span
                        className='text-2xl text-gray-400 font-normal ml-4'>{getTotalItemsInCart(cart)}
                    </span>
                </h2>
                <span onClick={removeAllItem}
                      className='text-lg cursor-pointer tracking-wide text-red-600 hover:text-red-700 transition duration-300 ease-in-out'>Удалить все</span>
            </div>
            <CartItemInfo/>
            {
                !!cart.length
                &&
                <div className='mt-16 text-2xl'>
                    Общая сумма заказа: {' '}
                    <CartTotalPrice/>
                </div>
            }
        </>
    );
};

export default CartItemsList;