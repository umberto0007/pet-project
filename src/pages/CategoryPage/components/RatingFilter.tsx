import React, {useState} from "react";

import {CATEGORY_FILTERS, RATING_VALUES, STARS_COUNT} from '#utils/constants';


import {FilterProps} from "#types/models/product.types";
import {renderStars} from "#utils/ui";
import ShowProductsButton from "#components/UI/Button/ShowProductsButton";


const RatingFilter: React.FC<FilterProps> =
    ({
         dispatch,
         stateFilter,
         applyButtonFilter,
         setApplyButtonFilter
     }) => {

        const [lastChangRating, setLastChangeRating] = useState<string | null>(null)

        return (
            <>
                {RATING_VALUES.map((rat, index) => (
                    <li key={index} className='mt-3'>
                        <label className='flex items-center gap-x-3 p-1 relative'>
                            <input
                                onChange={() => {
                                    dispatch({type: 'RATING_FILTER', payload: rat.value});
                                    setApplyButtonFilter?.(CATEGORY_FILTERS.RATING);
                                    setLastChangeRating(rat.value);
                                }
                                }
                                className='cursor-pointer scale-[1.2]'
                                type='radio'
                                value={rat.value}
                                checked={stateFilter?.ratingFilter === rat.value}
                            />
                            {rat.value === 'none'
                                ?
                                <div className='flex items-center gap-x-1'>Показать все</div>
                                :
                                <>
                                    От
                                    <div className='flex items-center gap-x-1'>{renderStars(STARS_COUNT[index])}</div>
                                </>
                            }
                            {applyButtonFilter === CATEGORY_FILTERS.RATING && lastChangRating === rat.value && (
                                <ShowProductsButton/>
                            )}
                        </label>
                    </li>
                ))}
            </>
        );
    };

export default RatingFilter;