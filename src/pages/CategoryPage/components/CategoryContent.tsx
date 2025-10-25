import React, {useMemo, useReducer} from 'react';

import {IoIosArrowUp} from "react-icons/io";

import {ChildProps} from '#types/models/product.types';
import RatingFilter from "#pages/CategoryPage/components/RatingFilter";
import PriceRangeFilter from "#pages/CategoryPage/components/PriceRangeFilter";
import SkeletonCategoryPage from '#components/UI/Skeleton/SkeletonCategoryPage';
import ProductCard from '#components/UI/CardTemplate/ProductCard';
import DiscountFilter from "#pages/CategoryPage/components/DiscountFilter";
import {discountPrice} from "#utils/common";
import AvailabilityFilter from "#pages/CategoryPage/components/AvailabilityFilter";
import BrandFilter from "#pages/CategoryPage/components/BrandFilter";
import {filterReducer, filterState} from "#pages/CategoryPage/state/filterReducer";
import {filterVisibilityInitialState, filterVisibilityReducer} from "#pages/CategoryPage/state/filterVisibilityReducer";
import {filterProducts} from "#utils/products/filterProducts";


const CategoryContent: React.FC<ChildProps> = ({products, isLoading}) => {
    const [filterVisibilityState, filterVisibilityDispatch] = useReducer(filterVisibilityReducer, filterVisibilityInitialState)
    const [stateFilter, dispatchFilter] = useReducer(filterReducer, filterState)

    let filteredProducts = filterProducts(products ?? [], stateFilter)

    // Создаем массив products с игнором selectedBrands, чтобы список брендов при выборе не схлопывался
    let filteredWithoutBrand = filterProducts(products ?? [], {...stateFilter, selectedBrands: []})

    // Создаем массив products с игнором priceRange, чтобы избежать самофильтрации диапазона цен при использовании слайдера
    let filteredWithoutPrice = filterProducts(products ?? [], {...stateFilter, priceRange: undefined})


    // Преобразуем и сортируем цены через filteredWithoutPrice
    const filterPrices = useMemo(() => {
        if (!filteredWithoutPrice) return []
        return filteredWithoutPrice.map(prod =>
            discountPrice(prod.price ?? 0, prod.discountPercentage ?? 0))
            .sort((a, b) => a - b)
    }, [filteredWithoutPrice])


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
                                className={`transform transition-transform duration-200 ease-in-out ${filterVisibilityState.isVisibilityAvailability ? '' : 'rotate-180'}`}>
                                <IoIosArrowUp size={20} fill='gray'/>
                            </span>
                        </button>
                        <ul className={`${!filterVisibilityState.isVisibilityAvailability ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
                            <AvailabilityFilter dispatch={dispatchFilter}/>
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
                        <PriceRangeFilter
                            dispatch={dispatchFilter}
                            filterPrices={filterPrices}
                        />
                    </div>
                </>
                {
                    (products && products[0].brand) && <div className='mb-8'>
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
                                <BrandFilter
                                    dispatch={dispatchFilter}
                                    filteredWithoutBrand={filteredWithoutBrand}
                                />
                            </ul>
                        </div>npm run start

                    </div>
                }
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
                        <ul className={`${!filterVisibilityState.isVisibilityDiscount ? 'max-h-0 overflow-hidden' : 'max-h-screen pt-3'} transition-max-height duration-300 ease-in-out`}>
                            <DiscountFilter dispatch={dispatchFilter}/>
                        </ul>
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
                            <RatingFilter dispatch={dispatchFilter}/>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap gap-y-5'>
                {isLoading
                    ?
                    <SkeletonCategoryPage/>
                    :
                    filteredProducts && filteredProducts.length > 0
                        ?
                        filteredProducts.map((product) =>
                            <ProductCard
                                {...product}
                                key={product.id}
                            />
                        )
                        :
                        <span className='text-red-700 text-2xl ml-48'>Не нашли нужный товар? Попробуйте изменить критерии поиска</span>
                }
            </div>
        </div>
    );
};

export default CategoryContent;