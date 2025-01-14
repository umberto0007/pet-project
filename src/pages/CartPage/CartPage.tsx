import React, {useState} from 'react';

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
import {LazyLoadImage} from 'react-lazy-load-image-component';
import stub from '#assets/stub/stub.webp';
import {Link} from 'react-router-dom';
import {BASE_URL} from '#utils/constants';




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

    console.log(cart)


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
                    <div className='flex flex-wrap justify-between items-center shadow-md p-3 mb-5 rounded-2xl bg-white'
                         key={id}>
                        <Link to={`../${category}/${id}`} className='flex items-center flex-wrap'>
                            <LazyLoadImage
                                placeholderSrc={stub}
                                className={`${category === 'vehicle' ? 'bg-cover ' : 'bg-contain '} w-40 h-40 bg-center bg-no-repeat`}
                                src={images?.[0]}
                            />
                            <h3 className='text-2xl w-[20rem]'>{title}</h3>
                        </Link>
                        <div className='flex items-center m-3'>
                            <CiSquareMinus
                                onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}
                                size={45}
                                className={`${quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}/>
                            <span className='flex justify-center items-center text-xl w-[32px]'>{quantity}</span>
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
                        <CiTrash className='m-5 cursor-pointer shrink-0' onClick={() => removeItem(item.id)} size={30}/>
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
        </div>
    );
};

export default CartPage;