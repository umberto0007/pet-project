import {useTypedSelector} from '#hooks/useTypedSelector';
import {IProduct, StateProduct} from '#types/models/product.types';
import {Link} from 'react-router-dom';
import {discountPrice, urlImg} from '#utils/common';
import {CiSquareMinus, CiSquarePlus, CiTrash} from 'react-icons/ci';
import {addItemToCart, removeItemFromCart} from '#redux/features/user/userSlice';
import {useDispatch} from 'react-redux';

const CartItemInfo = () => {
    const dispatch = useDispatch()
    const {cart} = useTypedSelector(({user}: { user: StateProduct }) => user)

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
        <>
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
                                 size={30}
                        />
                    </div>
                )
            }).reverse()}
        </>
    );
};

export default CartItemInfo;