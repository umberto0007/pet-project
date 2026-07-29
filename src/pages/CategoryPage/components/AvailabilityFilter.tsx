import React from 'react';

import {FilterProps} from '#types/models/product.types';
import {CATEGORY_FILTERS} from "#utils/constants";
import ShowProductsButton from "#components/UI/Button/ShowProductsButton";


const AvailabilityFilter: React.FC<FilterProps> =
    (
        {
            dispatch,
            stateFilter,
            applyButtonFilter,
            setApplyButtonFilter
        }
    ) => {
        return (
            <div className='relative'>
                <li className='mt-3 p-1'>
                    <label className='flex items-center gap-x-3'>
                        <input
                            checked={stateFilter?.isInStock}
                            className='scale-[1.2] cursor-pointer'
                            type='checkbox'
                            onChange={() => {
                                dispatch({type: 'TOGGLE_IN_STOCK'});
                                setApplyButtonFilter?.(CATEGORY_FILTERS.STOCK);
                            }}
                        />
                        <span className='mt-[2.5px]'>Только в наличии</span>
                    </label>
                </li>
                {applyButtonFilter === CATEGORY_FILTERS.STOCK && (
                    <ShowProductsButton/>
                )}
            </div>
        );
    };

export default AvailabilityFilter;