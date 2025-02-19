import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {FaStar} from 'react-icons/fa';

import {discountPrice} from '#utils/common';
import {addItemToCart} from '#redux/features/user/userSlice';
import {ChildProps, IProduct, StateProduct} from '#types/models/product.types';
import {useTypedSelector} from '#hooks/useTypedSelector';
import RegistrationButton from '#components/UI/Button/RegistrationButton';
import AddToCartButton from '#components/UI/Button/AddToCartButton';
import UserForm from '#components/Auth/User/UserForm';
import ToCartPageLink from '#pages/CartPage/ToCartPageLink';
import ToMainLink from '#pages/CartPage/ToMainLink';


const Description: React.FC<ChildProps> = ({product = {} as IProduct}) => {
    const dispatch = useDispatch()
    const [formActive, setFormActive] = useState<boolean>(false);
    const {currentUser} = useTypedSelector(({user}) => user)
    const {cart} = useTypedSelector(({user}: { user: StateProduct }) => user)

    const {
        id,
        sku = 0,
        title,
        rating,
        stock,
        price,
        description,
        discountPercentage,
    } = product


    const addToCart = () => {
        dispatch(addItemToCart(product))
    }

    const handleClick = () => {
        setFormActive(true);
    };

    const isItemInCart = (item: IProduct | undefined) =>
        cart.some(cartItem => cartItem.id === item?.id);

    return (
        <>
            <div>
                <h1 className='text-4xl font-bold tracking-wide'>{title}</h1>
                <div className='flex items-center gap-10'>
                    <div
                        className='mt-4 text-gray-500 text-md'>Артикул: {sku}</div>
                    <div className='flex items-center mt-2'>
                        {<FaStar fill='black'/>}
                        <div className='ml-1 mt-1'>{rating?.toFixed(1)}</div>
                        {(stock ?? 0) > 30
                            ?
                            <div className='ml-3 mt-1 text-green-500 tracking-wide'>в наличии</div>
                            :
                            (stock === 0)
                                ?

                                <div className='ml-3 mt-1 text-gray-500 tracking-wide'>нет в наличии</div>
                                :
                                <div className='ml-3 mt-1 text-red-500 tracking-wide'>осталось мало</div>
                        }
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-32'>
                <div>
                    <div className='flex items-center gap-4'>
                        <div
                            className='line-through text-4xl text-gray-500'>{Math.round((price ?? 0) * 10)}</div>
                        {(discountPercentage ?? 0) < 5
                            ?
                            <span
                                className='bg-gray-700 text-white rounded-md  text-lg w-12 h-7 text-center p-0.5'>{-30 + '%'}
                                                </span>
                            :
                            <span
                                className='bg-gray-700 text-white rounded-md  text-lg w-12 h-7 text-center p-0.5'>{-Math.round(discountPercentage ?? 0) + '%'}
                                                </span>
                        }
                    </div>
                    <div
                        className='text-4xl font-bold mt-3'>{discountPrice(price ?? 0, discountPercentage ?? 0) + ' ₽'}</div>
                </div>
                {!currentUser
                    ?
                    <RegistrationButton handleClick={handleClick}/>
                    :
                    isItemInCart({id})
                        ?
                        <ToCartPageLink/>
                        :
                        stock === 0
                            ?
                            <div className='flex flex-col'>
                                <span className='text-red-500'>Товар временно не доступен</span>
                                <ToMainLink/>
                            </div>
                            :
                            <AddToCartButton addToCart={addToCart}/>
                }
                <UserForm active={formActive} setActive={setFormActive}/>
            </div>
            <div>
                <h3 className='font-bold text-3xl tracking-wide'>Описание</h3>
                <p className='mt-5 text-2xl tracking-wide'>{description}</p>
            </div>
        </>
    );
};

export default Description;