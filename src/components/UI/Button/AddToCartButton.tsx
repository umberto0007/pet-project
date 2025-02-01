import React from 'react';

import {FormsProps} from '#types/entities/formsProps';


const AddToCartButton: React.FC<FormsProps> = ({addToCart}) => {
    return (
        <button
            title='Добавить в корзину'
            onClick={addToCart}
            className='bg-purple-600 py-3 rounded-lg min-w-80 hover:bg-purple-500 text-white transition duration-300 ease-in-out ml-2'>
            <div className='flex items-center justify-center gap-3'>
                <span className='text-lg tracking-wide'>Добавить в корзину</span>
            </div>
        </button>
    );
};

export default AddToCartButton;