import React from "react";

import {RATING_VALUES, STARS_COUNT} from '#utils/constants';


import {FilterProps} from "#types/models/product.types";
import {renderStars} from "#utils/ui";


const RatingFilter: React.FC<FilterProps> = ({dispatch}) => {

    return (
        <>
            {RATING_VALUES.map((rat, index) => (
                <li key={index} className='mt-3 p-1'>
                    <label className='flex items-center gap-x-3'>
                        <input onChange={() => dispatch({type: 'RATING_FILTER', payload: rat.value})}
                               className='cursor-pointer scale-[1.2]' type='radio' name='rating'/>
                        {rat.value === 'none'
                            ?
                            <div className='flex items-center gap-x-1'>Показать все</div>
                            :
                            <>
                                От
                                <div className='flex items-center gap-x-1'>{renderStars(STARS_COUNT[index])}</div>
                            </>
                        }
                    </label>
                </li>
            ))}
        </>
    );
};

export default RatingFilter;