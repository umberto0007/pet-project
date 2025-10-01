import React from 'react';
import {FilterProps} from '#types/models/product.types';


const AvailabilityFilter: React.FC<FilterProps> = ({dispatch}) => {
    return (
        <>
            <li className='mt-3 p-1'>
                <label className='flex items-center gap-x-3'>
                    <input className='scale-[1.2] cursor-pointer' type='checkbox'
                           onChange={() => dispatch({type: 'TOGGLE_IN_STOCK'})}/>
                    <span className='mt-[2.5px]'>В наличии</span>
                </label>
            </li>
            <li className='mt-3 p-1'>
                <label className='flex items-center gap-x-3'>
                    <input className='scale-[1.2] cursor-pointer' type='checkbox'
                           onChange={() => dispatch({type: 'TOGGLE_NOT_AVAILABLE'})}/>
                    <span className='mt-[2.5px]'>Нет в наличии</span>
                </label>
            </li>
        </>
    );
};

export default AvailabilityFilter;