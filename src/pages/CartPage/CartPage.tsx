import React, {useEffect, useState} from 'react';

import {useTypedSelector} from '#hooks/useTypedSelector';
import EmptyToMainCart from '#pages/CartPage/EmptyToMainCart';
import EmptyAuthCart from '#pages/CartPage/EmptyAuthCart';
import SignupSuccessMessage from '#components/auth/authMessage/SignupSuccessMessage';
import {IProduct, StateProduct} from '#types/models/product.types';
import {discountPrice, getTotalItemsInCart} from '#utils/common';
import {useDispatch} from 'react-redux';
import {addItemToCart, removeItemFromCart} from '#redux/features/user/userSlice';
import {CiSquareMinus} from "react-icons/ci";
import {CiSquarePlus} from "react-icons/ci";
import {CiTrash} from "react-icons/ci";





const CartPage = () => {
    const {currentUser} = useTypedSelector(({user}) => user)
    const [formActive, setFormActive] = useState<boolean>(false);
    const {cart} = useTypedSelector(({user}: { user: StateProduct }) => user)
    const dispatch = useDispatch()

    const handleClick = () => {
        setFormActive(true);
    };

    const changeQuantity = (item: IProduct, quantity: number) => {
        dispatch(addItemToCart({...item, quantity}))
    }



    const removeItem = (id: number) => {
        const product: IProduct = {
            id,
        };
        dispatch(removeItemFromCart(product))
    }

    return (
        <div className='mt-24'>
            {/*<h2 className='font-bold text-4xl text-grey tracking-wide'>Корзина пуста</h2>*/}
            {/*{currentUser*/}
            {/*    ?*/}
            {/*    <EmptyToMainCart/>*/}
            {/*    :*/}
            {/*    <EmptyAuthCart*/}
            {/*        handleClick={handleClick}*/}
            {/*        active={formActive}*/}
            {/*        setActive={setFormActive}/>*/}
            {/*}*/}
            <h2 className='font-bold text-4xl text-grey tracking-wide mb-7'>Корзина<span
                className='text-2xl text-gray-400 font-normal ml-4'>{getTotalItemsInCart(cart)}</span></h2>
            {cart.map((item) => {
                const {title, id, images, quantity = 0, discountPercentage, price, category} = item
                return (
                    <div className='flex justify-between items-center shadow-md p-3 mb-5 rounded-2xl bg-white' key={id}>
                        <div className='flex items-center'>
                            <div
                                className={`${category === 'vehicle' ? 'bg-cover ' : 'bg-contain '}w-40 h-40 bg-center bg-no-repeat`}
                                style={{backgroundImage: `url(${images?.[0] ?? '../../assets/stub/stub.webp'})`}}/>
                            <h3 className='text-2xl'>{title}</h3>
                        </div>
                        <div className='flex items-center gap-4'>
                            <CiSquareMinus
                                onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}
                                size={45}
                                className='cursor-pointer'/>
                            <span className='text-xl'>{quantity}</span>
                            <CiSquarePlus
                                onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}
                                size={45}
                                className='cursor-pointer'/>
                        </div>
                        <div>
                            <div className='flex items-center gap-4'>
                                <div
                                    className='line-through text-xl text-gray-500'>{Math.round((price ?? 0) * 10)}</div>
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
                                className='text-3xl font-bold mt-3'>{discountPrice(price ?? 0, discountPercentage ?? 0)}</div>
                        </div>
                        <CiTrash className='cursor-pointer' onClick={() => removeItem(item.id)} size={30}/>
                    </div>
                )
            })}
        </div>
    );
};

export default CartPage;