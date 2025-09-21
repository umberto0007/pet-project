import {Link} from 'react-router-dom';

const CartModalLink = () => {
    return (
        <Link title='Перейти в корзину' to={'/cart'}>
            <hr/>
            <div
                className='min-w-80 bg-purple-600 py-3 rounded-lg hover:bg-purple-500 transition duration-300 ease-in-out text-lg text-center text-white tracking-wide m-5'>
                Перейти в корзину
            </div>
        </Link>
    );
};

export default CartModalLink;