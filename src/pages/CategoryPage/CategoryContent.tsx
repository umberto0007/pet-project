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
    isVisibilityAvailability: false,
    isVisibilityPrice: false,
    isVisibilityBrand: false,
    isVisibilityDiscount: false,
    isVisibilityRating: false,
}


const filterVisibilityReducer = (state: FilterVisibilityStateType, {type}: FilterVisibilityActionType) => {
    switch (type) {
        case 'TOGGLE_VISIBILITY_AVAILABILITY':
            return {...state, isVisibilityAvailability: !state.isVisibilityAvailability}
        case 'TOGGLE_VISIBILITY_PRICE':
            return {...state, isVisibilityPrice: !state.isVisibilityPrice}
        case 'TOGGLE_VISIBILITY_BRAND':
            return {...state, isVisibilityBrand: !state.isVisibilityBrand}
        case 'TOGGLE_VISIBILITY_DISCOUNT':
            return {...state, isVisibilityDiscount: !state.isVisibilityDiscount}
        case 'TOGGLE_VISIBILITY_RATING':
            return {...state, isVisibilityRating: !state.isVisibilityRating}
        default:
            throw new Error('Неправильное действие')
    }
}


const filterState: FilterStateType = {
    isInStock: false,
    isNotAvailable: false,
    selectedBrands: []
}


const filterReducer = (state: FilterStateType, {type, payload}: FilterActionType) => {
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
        case 'TOGGLE_BRAND':
            if (state.selectedBrands.includes(payload)) {
                return {
                    selectedBrands: state.selectedBrands.filter(brand => brand !== payload)
                }
            }
            return {
                selectedBrands: [...state.selectedBrands, payload]
            }
        default:
            return state
    }
}


const CategoryContent: React.FC<ChildProps> = ({products, isLoading}, selectedBrands: FilterStateType) => {
    const [filterVisibilityState, filterVisibilityDispatch] = useReducer(filterVisibilityReducer, filterVisibilityInitialState)
    const [stateFilter, dispatchFilter] = useReducer(filterReducer, filterState)

    const productBrand = products && getUniqueBrands(
        products
            .map(prod => prod.brand)
            .filter(brand => brand !== undefined) as string[]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatchFilter({type: 'TOGGLE_BRAND', payload: event.target.value});
    };


    let filteredProducts = products


    if (stateFilter.isInStock) {
        filteredProducts = filteredProducts?.filter(prod => prod.stock !== undefined && prod.stock > 0)
    }

    if (stateFilter.isNotAvailable) {
        filteredProducts = filteredProducts?.filter(prod => prod.stock === 0);
    }

    if (stateFilter.selectedBrands) {
        const selectedBrands = stateFilter.selectedBrands as string[];
        filteredProducts = filteredProducts?.filter(
            (product) => selectedBrands.length === 0 || selectedBrands.includes(product.brand ?? '')
        );
    }

    return (
        <div className='flex'>
            <div className='min-w-[16rem] mr-2'>
                <div className='mb-8'>
                    <div className='relative'>
                        <button
                            type='button'
                            className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none] text-xl font-bold tracking-wide hover:text-gray-500 transition-all duration-200'
                            onClick={() => filterVisibilityDispatch({type: 'TOGGLE_VISIBILITY_AVAILABILITY'})}
                        >
                            Наличие
                            <span
                                className={`transform transition-transform duration-200 ease-in-out ${filterVisibilityState.isVisibilityAvailability ? '' : 'rotate-180'}`}
                            ><IoIosArrowUp size={20} fill='gray'/></span>
                        </button>
                        <ul className={`${!filterVisibilityState.isVisibilityAvailability ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
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
                <>
                    <button
                        type="button"
                        className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none] text-xl font-bold  tracking-wide hover:text-gray-500 transition-all duration-200'
                        onClick={() => filterVisibilityDispatch({type: 'TOGGLE_VISIBILITY_PRICE'})}
                    >
                        Цена
                        <span
                            className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${filterVisibilityState.isVisibilityPrice ? '' : 'rotate-180'}`}><IoIosArrowUp
                            size={20} fill='gray'/></span>
                    </button>
                    <div
                        className={`${!filterVisibilityState.isVisibilityPrice ? 'max-h-0 overflow-hidden' : 'max-h-screen'} transition-max-height duration-300 ease-in-out mt-8`}>
                        <PriceRangeFilter/>
                    </div>
                </>
                {(products && products[0].brand) && <div className='mb-8'>
                    <div className='relative'>
                        <button
                            type="button"
                            className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none] text-xl font-bold tracking-wide hover:text-gray-500 transition-all duration-200'
                            onClick={() => filterVisibilityDispatch({type: 'TOGGLE_VISIBILITY_BRAND'})}
                        >
                            Бренд
                            <span
                                className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${filterVisibilityState.isVisibilityBrand ? '' : 'rotate-180'}`}><IoIosArrowUp
                                size={20} fill='gray'/></span>
                        </button>
                        <ul className={`${!filterVisibilityState.isVisibilityBrand ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
                            <li className='flex flex-col'>
                                {
                                    productBrand?.map(brand =>
                                        <label className='flex gap-x-3 mt-3 items-center p-1' key={brand}>
                                            <input
                                                className='scale-[1.2] cursor-pointer'
                                                type='checkbox'
                                                value={brand}
                                                onChange={handleChange}
                                            />
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
                            className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none] text-xl font-bold tracking-wide hover:text-gray-500 transition-all duration-200'
                            onClick={() => filterVisibilityDispatch({type: 'TOGGLE_VISIBILITY_DISCOUNT'})}
                        >
                            Скидка
                            <span
                                className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${filterVisibilityState.isVisibilityDiscount ? '' : 'rotate-180'}`}><IoIosArrowUp
                                size={20} fill='gray'/></span>
                        </button>
                        <div
                            className={`${!filterVisibilityState.isVisibilityDiscount ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
                            <PriceRangeFilter/>
                        </div>
                    </div>
                </div>
                <div className='mb-8'>
                    <div className='relative'>
                        <button
                            type="button"
                            className='w-full text-left cursor-pointer font-[bold] text-[#333] flex justify-between items-center p-0 border-[none] text-xl font-bold tracking-wide hover:text-gray-500 transition-all duration-200'
                            onClick={() => filterVisibilityDispatch({type: 'TOGGLE_VISIBILITY_RATING'})}
                        >
                            Рейтинг покупателей
                            <span
                                className={`transition-transform duration-[0.3s] ease-[ease-in-out] ${filterVisibilityState.isVisibilityRating ? '' : 'rotate-180'}`}><IoIosArrowUp
                                size={20} fill='gray'/></span>
                        </button>
                        <ul className={`${!filterVisibilityState.isVisibilityRating ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
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

export default CategoryContent;