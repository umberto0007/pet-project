import {FaStar} from 'react-icons/fa';

import {RATING_VALUES} from '#utils/constants';


const RatingValues = () => {
    // Функция для создания звезд
    const renderStars = (count: number) => {
        return [...Array(count)].map((_, index) => (
            <FaStar key={index} fill='black'/>
        ));
    };

    return (
        <>
            {RATING_VALUES.map((rating) => (
                <li className='mt-3 p-1' key={rating}>
                    <label className='flex items-center gap-x-3'>
                        <input className='cursor-pointer scale-[1.2]' type='radio' name='rating'/>
                        От
                        <div className='flex items-center gap-x-1'>{renderStars(rating)}</div>
                    </label>
                </li>
            ))}
        </>
    );
};

export default RatingValues;