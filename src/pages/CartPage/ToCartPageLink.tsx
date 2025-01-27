import React from 'react';
import {Link} from 'react-router-dom';

const ToCartPageLink = () => {
    return (
        <Link to={'cart'} className='py-3'>
            <div
                className='bg-blue-100 py-3 rounded-lg min-w-[23rem] hover:bg-blue-200 transition-[0.4s] duration-[all] text-lg text-center tracking-wide'>
                Перейти в корзину
            </div>
        </Link>
    );
};

export default ToCartPageLink;