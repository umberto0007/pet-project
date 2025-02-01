import {useTypedSelector} from '#hooks/useTypedSelector';
import {IProduct, StateProduct} from '#types/models/product.types';
import {Link} from 'react-router-dom';
import {urlImg} from '#utils/common';
import {CiTrash} from 'react-icons/ci';
import {removeItemFromCart} from '#redux/features/user/userSlice';
import {useDispatch} from 'react-redux';
import CartModalLink from '#pages/CartPage/CartModalLink';
import {FormsProps} from '#types/entities/formsProps';


const CartModal = ({active}: FormsProps) => {
    const dispatch = useDispatch()
    const {cart} = useTypedSelector(({user}: { user: StateProduct }) => user)


    const removeItem = (id: number) => {
        const product: IProduct = {
            id,
        };
        dispatch(removeItemFromCart(product))
    }

    return (
        <div
            className={`${active ? 'visible' : 'invisible -translate-y-10'} absolute z-50 bg-white right-1.5 top-15 rounded-lg shadow-md transition-all duration-[0.3s] ease-[ease-in-out]`}>

            <ul className='max-h-80 overflow-y-auto scrollbar-hide'>
                {
                    cart.map((item) => {
                        const {images, title, category, id, quantity} = item
                        return (
                            <li className='flex px-6 pt-6 mb-3' key={id}>
                                <Link title='Перейти на страницу товара' to={`../${category}/${id}`} key={id}
                                      className='flex items-center'>
                                    <div className='flex'>
                                        <div
                                            className={`${category === 'vehicle' ? 'bg-cover ' : 'bg-contain '} min-w-20 h-20 bg-center bg-no-repeat bg-gray-100`}
                                            style={{
                                                backgroundImage: urlImg(`url(${images?.[0]})`)
                                            }}
                                        />
                                        <div className='flex flex-col gap-y-2 ml-6'>
                                            <h3 className='flex flex-wrap text-md min-w-52'>{title}</h3>
                                            <span className='text-gray-500'>{quantity} шт.</span>
                                        </div>
                                    </div>
                                </Link>
                                <CiTrash title='Удалить товар' className='m-1 cursor-pointer shrink-0'
                                         onClick={() => removeItem(item.id ?? 0)}
                                         size={20}
                                />
                            </li>
                        )
                    }).reverse()
                }
            </ul>
            <CartModalLink/>
        </div>
    );
};

export default CartModal;