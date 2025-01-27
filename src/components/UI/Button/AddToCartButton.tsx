import React from 'react';

import {FormsProps} from '#types/entities/formsProps';
import BASKET from '#assets/icons/basket.svg';


const AddToCartButton: React.FC<FormsProps> = ({addToCart}) => {
    return (
        <button
            title='Добавить в корзину'
            onClick={addToCart}
            className='bg-blue-100 py-3 rounded-lg mt-10 min-w-72 hover:bg-blue-200 transition-[0.4s] duration-[all]'>
            <div className='flex items-center justify-center gap-3'>
                <img src={BASKET}/>
                <span className='text-lg tracking-wide'>В корзину</span>
            </div>
        </button>
    );
};

export default AddToCartButton;