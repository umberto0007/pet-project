import React from 'react';

import {useTypedSelector} from '#hooks/useTypedSelector';
import EmptyToMainCart from '#pages/CartPage/EmptyToMainCart';
import EmptyAuthCart from '#pages/CartPage/EmptyAuthCart';
import SignupSuccessMessage from '#components/Auth/authMessage/SignupSuccessMessage';
import {IProduct, StateProduct} from '#types/models/product.types';
import {discountPrice, getTotalItemsInCart, urlImg} from '#utils/common';
import {useDispatch} from 'react-redux';
import {addItemToCart, removeAllItemFromCart, removeItemFromCart} from '#redux/features/user/userSlice';
import {CiSquareMinus} from "react-icons/ci";
import {CiSquarePlus} from "react-icons/ci";
import {CiTrash} from "react-icons/ci";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import stub from '#assets/stub/stub.webp';
import {Link} from 'react-router-dom';


const CartPage = () => {
    const {cart} = useTypedSelector(({user}: { user: StateProduct }) => user)
    const dispatch = useDispatch()


    const changeQuantity = (item: IProduct, quantity: number) => {
        dispatch(addItemToCart({...item, quantity}))
    }


    const removeItem = (id: number) => {
        const product: IProduct = {
            id,
        };
        dispatch(removeItemFromCart(product))
    }

    const removeAllItem = () => {
        dispatch(removeAllItemFromCart())
    }

    return (
        <div className='mt-24'>
            {
                cart.length > 0
                    ?
                    <>
                        <div className='flex items-center justify-between mb-7'>
                            <h2 className='font-bold text-4xl text-grey tracking-wide'>
                                Корзина
                                <span
                                    className='text-2xl text-gray-400 font-normal ml-4'>{getTotalItemsInCart(cart)}
                    </span>
                            </h2>
                            <span onClick={removeAllItem} className='text-lg cursor-pointer tracking-wide text-red-600'>Удалить все</span>
                        </div>
                        {cart.map((item) => {
                            const {title, id, images, quantity = 0, discountPercentage, price, category} = item
                            return (
                                <div
                                    className='flex flex-wrap justify-between items-center shadow-md mb-5 rounded-2xl bg-white'
                                    key={id}>
                                    <Link to={`../${category}/${id}`} className='flex items-center flex-wrap'>
                                        <div
                                            className={`${category === 'vehicle' ? 'bg-cover ' : 'bg-contain '} w-40 h-40 bg-center bg-no-repeat`}
                                            style={{
                                                backgroundImage: urlImg(`url(${images?.[0]})`)
                                            }}
                                        />
                                        <h3 className='text-2xl w-[20rem] ml-3'>{title}</h3>
                                    </Link>
                                    <div className='flex items-center m-3'>
                                        <CiSquareMinus
                                            onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}
                                            size={45}
                                            className={`${quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}/>
                                        <span
                                            className='flex justify-center items-center text-xl w-[32px]'>{quantity}</span>
                                        <CiSquarePlus
                                            onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}
                                            size={45}
                                            className='cursor-pointer'/>
                                    </div>
                                    <div className='flex flex-col w-[15rem]'>
                                        <div
                                            className='text-3xl font-bold mt-3 flex justify-end'>{discountPrice(price ?? 0, discountPercentage ?? 0, quantity) + ' ₽'}
                                        </div>
                                        <div
                                            className='line-through text-xl text-gray-500 flex justify-end'>{Math.round((price ?? 0) * 10) * quantity}
                                        </div>
                                    </div>
                                    <CiTrash className='m-5 cursor-pointer shrink-0'
                                             onClick={() => removeItem(item.id ?? 0)}
                                             size={30}/>
                                </div>
                            )
                        })}

                        {
                            !!cart.length
                            &&
                            <div className='mt-16 text-2xl'>
                                Общая сумма заказа: {' '}
                                {
                                    cart.map(item => discountPrice(item.price ?? 0, item.discountPercentage ?? 0, item.quantity)).reduce((prev, cur) => (prev ?? 0) + (cur ?? 0)) + ' ₽'
                                }
                            </div>
                        }
                    </>
                    :
                    <>
                        <h2 className='font-bold text-4xl text-grey tracking-wide'>Корзина пуста</h2>
                        <EmptyToMainCart/>
                    </>
            }
        </div>
    );
};

export default CartPage;