import {discountPrice} from '#utils/common';
import {useTypedSelector} from '#hooks/useTypedSelector';
import {StateProduct} from '#types/models/product.types';

const CartTotalPrice = () => {
    const {cart} = useTypedSelector(({user}: { user: StateProduct }) => user)

    return (
        <>
            {
                cart.map(item => discountPrice(item.price ?? 0, item.discountPercentage ?? 0, item.quantity)).reduce((prev, cur) => (prev ?? 0) + (cur ?? 0)) + ' ₽'
            }
        </>
    );
};

export default CartTotalPrice;