import {useTypedSelector} from '#hooks/useTypedSelector';
import {IProduct, StateProduct} from '#types/models/product.types';
import {Link} from 'react-router-dom';
import {urlImg} from '#utils/common';
import {CiTrash} from 'react-icons/ci';
import {removeItemFromCart} from '#redux/features/user/userSlice';
import {useDispatch} from 'react-redux';
import ToCartPageLink from '#pages/CartPage/ToCartPageLink';
import {FormsProps} from '#types/entities/formsProps';
import {useEffect} from 'react';


const CartModal = ({active, setActive = () => {}}: FormsProps) => {
    const dispatch = useDispatch()
    const {cart} = useTypedSelector(({user}: { user: StateProduct }) => user)

    useEffect(() => {
        if (active) {
            const timer = setTimeout(() => {
                setActive(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [active]);


    const removeItem = (id: number) => {
        const product: IProduct = {
            id,
        };
        dispatch(removeItemFromCart(product))
    }

    return (
        <div
            className={`${active ? 'visible' : 'invisible -translate-y-10'} absolute max-h-80 overflow-y-auto scrollbar-hide z-50 bg-white right-1.5 top-15 rounded-lg shadow-md transition duration-500 ease-in-out`}>
            <div className='flex flex-col items-center'>
                {cart.map((item) => {
                    const {images, title, category, id, quantity} = item
                    return (
                        <Link title='Перейти на страницу товара' to={`../${category}/${id}`} key={id}
                              className='flex items-center pt-6 px-6'>
                            <div className='flex'>
                                <div
                                    className={`${category === 'vehicle' ? 'bg-cover ' : 'bg-contain '} min-w-20 h-20 bg-center bg-no-repeat bg-gray-100`}
                                    style={{
                                        backgroundImage: urlImg(`url(${images?.[0]})`)
                                    }}
                                />
                                <div className='flex flex-col gap-y-2 mx-6'>
                                    <h3 className='flex flex-wrap text-md min-w-52'>{title}</h3>
                                    <span className='text-gray-500'>{quantity} шт.</span>
                                </div>
                                <CiTrash title='Удалить товар' className='cursor-pointer shrink-0'
                                         onClick={() => removeItem(item.id ?? 0)}
                                         size={20}
                                />
                            </div>
                        </Link>
                    )
                })}
                <hr className='mt-4 w-full'/>
                <ToCartPageLink/>
            </div>
        </div>
    );
};

export default CartModal;