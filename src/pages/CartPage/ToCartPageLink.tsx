import {Link} from 'react-router-dom';

const ToCartPageLink = () => {
    return (
        <Link title='Перейти в корзину' to={'/cart'}>
            <div
                className='min-w-80 border-2 border-purple-600 hover:bg-purple-600 hover:text-white py-3 rounded-lg transition duration-300 ease-in-out text-lg text-center tracking-wide ml-2'>
                Перейти в корзину
            </div>
        </Link>
    );
};

export default ToCartPageLink;