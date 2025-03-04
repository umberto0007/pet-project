import React, {useReducer} from 'react';

import {IoIosArrowUp} from "react-icons/io";

import {
    FilterActionType,
    FilterStateType,
    FilterVisibilityActionType,
    FilterVisibilityStateType
} from '#types/entities/categoryFilters';
import {ChildProps} from '#types/models/product.types';
import {getUniqueBrands} from '#utils/common';
import RatingValues from '#pages/CategoryPage/RatingValues';
import PriceRangeFilter from '#pages/CategoryPage/PriceRangeFilter';
import SkeletonCategoryPage from '#components/UI/Skeleton/SkeletonCategoryPage';
import ProductCard from '#components/UI/CardTemplate/ProductCard';


const filterVisibilityInitialState: FilterVisibilityStateType = {
    isAvailability: false,
    isPrice: false,
    isBrand: false,
    isDiscount: false,
    isRating: false,
}


const filterVisibilityReducer = (state: FilterVisibilityStateType, {type}: FilterVisibilityActionType) => {
    switch (type) {
        case 'TOGGLE_AVAILABILITY':
            return {...state, isAvailability: !state.isAvailability}
        case 'TOGGLE_PRICE':
            return {...state, isPrice: !state.isPrice}
        case 'TOGGLE_BRAND':
            return {...state, isBrand: !state.isBrand}
        case 'TOGGLE_DISCOUNT':
            return {...state, isDiscount: !state.isDiscount}
        case 'TOGGLE_RATING':
            return {...state, isRating: !state.isRating}
        default:
            throw new Error('Неправильное действие')
    }
}


const filterState: FilterStateType = {
    isInStock: false,
    isNotAvailable: false
}


const filterReducer = (state: FilterStateType, {type}: FilterActionType) => {
    switch (type) {
        case 'TOGGLE_IN_STOCK':
            return {
                ...state,
                isInStock: !state.isInStock
            }
        case 'TOGGLE_NOT_AVAILABLE':
            return {
                ...state,
                isNotAvailable: !state.isNotAvailable
            }
        default:
            return state
    }
}


const CategoryFilters: React.FC<ChildProps> = ({products, isLoading}) => {
    const [filterVisibilityState, filterVisibilityDispatch] = useReducer(filterVisibilityReducer, filterVisibilityInitialState)
    const [stateFilter, dispatchFilter] = useReducer(filterReducer, filterState)

    const productBrand = products && getUniqueBrands(products.map(prod => prod.brand).filter((brand): brand is string => typeof brand === 'string'))


    let filteredProducts = products

    if (stateFilter.isInStock) {
        filteredProducts = filteredProducts?.filter(prod => prod.stock !== undefined && prod.stock > 0)
    }

    if (stateFilter.isNotAvailable) {
        filteredProducts = filteredProducts?.filter(prod => prod.stock === 0);
    }


    return (
        <div className='flex'>
            <div className='min-w-[16rem] mr-2'>
                <div className='mb-8'>
                    <div className='relative'>
                        <button
                            type='button'
                            className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none] text-xl font-bold text-gray-700 tracking-wide hover:text-gray-500 transition-all duration-200'
                            onClick={() => filterVisibilityDispatch({type: 'TOGGLE_AVAILABILITY'})}
                        >
                            По наличию
                            <span
                                className={`transform transition-transform duration-200 ease-in-out ${filterVisibilityState.isAvailability ? '' : 'rotate-180'}`}
                            ><IoIosArrowUp size={20} fill='gray'/></span>
                        </button>
                        <ul className={`${!filterVisibilityState.isAvailability ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
                            <li className='mt-3 p-1'>
                                <label className='flex items-center gap-x-3'>
                                    <input className='scale-[1.2] cursor-pointer' type='checkbox'
                                           onChange={() => dispatchFilter({type: 'TOGGLE_IN_STOCK'})}/>
                                    <span className='mt-[2.5px]'>В наличии</span>
                                </label>
                            </li>
                            <li className='mt-3 p-1'>
                                <label className='flex items-center gap-x-3'>
                                    <input className='scale-[1.2] cursor-pointer' type='checkbox'
                                           onChange={() => dispatchFilter({type: 'TOGGLE_NOT_AVAILABLE'})}/>
                                    <span className='mt-[2.5px]'>Нет в наличии</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='mb-8'>
                    <div className='relative'>
                        <button
                            type="button"
                            className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none] text-xl font-bold text-gray-700 tracking-wide hover:text-gray-500 transition-all duration-200'
                            onClick={() => filterVisibilityDispatch({type: 'TOGGLE_PRICE'})}
                        >
                            По цене
                            <span
                                className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${filterVisibilityState.isPrice ? '' : 'rotate-180'}`}><IoIosArrowUp
                                size={20} fill='gray'/></span>
                        </button>
                        <div
                            className={`${!filterVisibilityState.isPrice ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
                            <PriceRangeFilter/>
                        </div>
                    </div>
                </div>
                {(products && products[0].brand) && <div className='mb-8'>
                    <div className='relative'>
                        <button
                            type="button"
                            className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none] text-xl font-bold text-gray-700 tracking-wide hover:text-gray-500 transition-all duration-200'
                            onClick={() => filterVisibilityDispatch({type: 'TOGGLE_BRAND'})}
                        >
                            По бренду
                            <span
                                className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${filterVisibilityState.isBrand ? '' : 'rotate-180'}`}><IoIosArrowUp
                                size={20} fill='gray'/></span>
                        </button>
                        <ul className={`${!filterVisibilityState.isBrand ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
                            <li className='flex flex-col'>
                                {
                                    productBrand?.map(brand =>
                                        <label className='flex gap-x-3 mt-3 items-center p-1' key={brand}>
                                            <input className='scale-[1.2] cursor-pointer' type='checkbox'/>
                                            <span className='mt-[2.5px]'>{brand}</span>
                                        </label>
                                    )
                                }
                            </li>
                        </ul>
                    </div>
                </div>}
                <div className='mb-8'>
                    <div className='relative'>
                        <button
                            type="button"
                            className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none] text-xl font-bold text-gray-700 tracking-wide hover:text-gray-500 transition-all duration-200'
                            onClick={() => filterVisibilityDispatch({type: 'TOGGLE_DISCOUNT'})}
                        >
                            По величине скидки
                            <span
                                className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${filterVisibilityState.isDiscount ? '' : 'rotate-180'}`}><IoIosArrowUp
                                size={20} fill='gray'/></span>
                        </button>
                        <div
                            className={`${!filterVisibilityState.isDiscount ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
                            <PriceRangeFilter/>
                        </div>
                    </div>
                </div>
                <div className='mb-8'>
                    <div className='relative'>
                        <button
                            type="button"
                            className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none] text-xl font-bold text-gray-700 tracking-wide hover:text-gray-500 transition-all duration-200'
                            onClick={() => filterVisibilityDispatch({type: 'TOGGLE_RATING'})}
                        >
                            Рейтинг покупателей
                            <span
                                className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${filterVisibilityState.isRating ? '' : 'rotate-180'}`}><IoIosArrowUp
                                size={20} fill='gray'/></span>
                        </button>
                        <ul className={`${!filterVisibilityState.isRating ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
                            <RatingValues/>
                            <li className='mt-3 p-1'>
                                <label className='flex items-center gap-x-3'>
                                    <input className='scale-[1.2] cursor-pointer' type='radio' name='rating'/>
                                    <span>Любой</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap gap-y-5'>
                {isLoading
                    ?
                    <SkeletonCategoryPage/>
                    :
                    filteredProducts && filteredProducts.map((product) =>
                        <ProductCard
                            {...product}
                            key={product.id}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default CategoryFilters;