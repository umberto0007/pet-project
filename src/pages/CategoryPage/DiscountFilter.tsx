import React from 'react';
import {DISCOUNT_VALUES} from '#utils/constants';
import {FilterActionType} from "#types/entities/categoryFilters";

type DiscountFilterProps = {
    dispatch: React.Dispatch<FilterActionType>
}

const DiscountFilter: React.FC<DiscountFilterProps> = ({dispatch}) => {
    return (
        <>
            {DISCOUNT_VALUES.map((disc, index) => (
                <li key={index} className='mt-3 p-1'>
                    <label className='flex items-center gap-x-3'>
                        <input onChange={() => dispatch({type: 'DISCOUNT_PRICE', payload: disc.value})} className='cursor-pointer scale-[1.2]' type='radio'
                               name='rating'/>
                        <div className='flex items-center gap-x-1'>{disc.discount}</div>
                    </label>
                </li>
            ))}
        </>
    );
};

export default DiscountFilter;