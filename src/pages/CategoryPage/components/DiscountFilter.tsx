import React, {useState} from 'react';
import {CATEGORY_FILTERS, DISCOUNT_VALUES} from '#utils/constants';
import {FilterProps} from "#types/models/product.types";
import ShowProductsButton from "#components/UI/Button/ShowProductsButton";


const DiscountFilter: React.FC<FilterProps> = (
    {
        dispatch,
        stateFilter,
        applyButtonFilter,
        setApplyButtonFilter
    }) => {

    const [lastChangDisc, setLastChangeDisc] = useState<string | null>(null)

    return (
        <>
            {DISCOUNT_VALUES.map((disc, index) => (
                <li key={index} className='mt-3'>
                    <label className='flex items-center gap-x-3 p-1 relative'>
                        <input
                            onChange={() => {
                                dispatch({type: 'DISCOUNT_PRICE', payload: disc.value});
                                setApplyButtonFilter?.(CATEGORY_FILTERS.DISCOUNT);
                                setLastChangeDisc(disc.value);
                            }}
                            className='cursor-pointer scale-[1.2]'
                            type='radio'
                            value={disc.value}
                            checked={stateFilter?.discountFilter === disc.value}
                        />
                        <div className='flex items-center gap-x-1'>{disc.discount}</div>
                        {applyButtonFilter === CATEGORY_FILTERS.DISCOUNT && lastChangDisc === disc.value && (
                            <ShowProductsButton/>
                        )}
                    </label>
                </li>
            ))}
        </>
    );
};

export default DiscountFilter;