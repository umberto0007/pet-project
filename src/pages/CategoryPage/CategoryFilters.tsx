import {useReducer} from 'react';

import PriceRangeFilter from '#pages/CategoryPage/PriceRangeFilter';
import {ActionType, StateType} from '#types/entities/productFilter';




const initialState: StateType = {
    isAvailability: false,
    isPrice: false,
    isBrand: false,
    isDiscount: false
}



const reducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'TOGGLE_AVAILABILITY':
            return {...state, isAvailability: !state.isAvailability}
        case 'TOGGLE_PRICE':
            return {...state, isPrice: !state.isPrice}
        case 'TOGGLE_BRAND':
            return {...state, isBrand: !state.isBrand}
        case 'TOGGLE_DISCOUNT':
            return {...state, isDiscount: !state.isDiscount}
        default:
            throw  new Error('Неправильное действие')
    }
}


const CategoryFilters = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className='border min-w-52 mr-2'>
            <div className='mb-5'>
                <div className='border bg-[#f9f9f9] relative p-2.5 border-solid border-[#ccc]'>
                    <button
                        type="button"
                        className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none]'
                        onClick={() => dispatch({type: 'TOGGLE_AVAILABILITY'})}
                    >
                        По наличию
                        <span
                            className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${state.isAvailability ? 'rotate-180' : ''}`}>^</span>
                    </button>
                    <ul className={`list-none mt-2.5 pl-0 ${state.isAvailability ? '' : 'hidden'}`}>
                        <li>
                            <label>
                                <input type='checkbox'/> В наличии
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type='checkbox'/> Нет в наличии
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='mb-5'>
                <div className='border bg-[#f9f9f9] relative p-2.5 border-solid border-[#ccc]'>
                    <button
                        type="button"
                        className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none]'
                        onClick={() => dispatch({type: 'TOGGLE_PRICE'})}
                    >
                        По цене
                        <span
                            className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${state.isPrice ? 'rotate-180' : ''}`}>^</span>
                    </button>
                    <div className={`list-none mt-2.5 pl-0 ${state.isPrice ? '' : 'hidden'}`}>
                        <PriceRangeFilter/>
                    </div>
                </div>
            </div>
            <div className='mb-5'>
                <div className='border bg-[#f9f9f9] relative p-2.5 border-solid border-[#ccc]'>
                    <button
                        type="button"
                        className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none]'
                        onClick={() => dispatch({type: 'TOGGLE_BRAND'})}
                    >
                        По бренду
                        <span
                            className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${state.isBrand ? 'rotate-180' : ''}`}>^</span>
                    </button>
                    <ul className={`list-none mt-2.5 pl-0 ${state.isBrand ? '' : 'hidden'}`}>
                        <li>
                            <label>
                                <input type='checkbox'/> Бренд
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='mb-5'>
                <div className='border bg-[#f9f9f9] relative p-2.5 border-solid border-[#ccc]'>
                    <button
                        type="button"
                        className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none]'
                        onClick={() => dispatch({type: 'TOGGLE_DISCOUNT'})}
                    >
                        По величине скидки
                        <span
                            className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${state.isDiscount ? 'rotate-180' : ''}`}>^</span>
                    </button>
                    <div className={`list-none mt-2.5 pl-0 ${state.isDiscount ? '' : 'hidden'}`}>
                        <PriceRangeFilter/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryFilters;