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


const CategoryContent: React.FC<ChildProps> = ({products, isLoading}) => {
    const [filterVisibilityState, filterVisibilityDispatch] = useReducer(filterVisibilityReducer, filterVisibilityInitialState)
    const [stateFilter, dispatchFilter] = useReducer(filterReducer, filterState)

    const SMALL = stateFilter?.discountFilter === 'small'
    const AVERAGE = stateFilter?.discountFilter === 'average'
    const BIG = stateFilter?.discountFilter === 'big'
    const NONE = stateFilter?.discountFilter === 'none'

    const FROM_TWO_STARS = stateFilter?.ratingFilter === 'fromTwoStars'
    const FROM_THREE_STARS = stateFilter?.ratingFilter === 'fromThreeStars'
    const FROM_FOUR_STARS = stateFilter?.ratingFilter === 'fromFourStars'
    const NO_STARS = stateFilter?.ratingFilter === 'none'






    let filteredProducts = products


    // Преобразуем и сортируем цены
    const prices = useMemo(() => {
        if (!filteredProducts) return []
        return filteredProducts.map(prod =>
            discountPrice(prod.price ?? 0, prod.discountPercentage ?? 0))
            .sort((a, b) => a - b)
    }, [filteredProducts])

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

    if ((stateFilter.priceRange && stateFilter.priceRange[0] > 0) || (stateFilter.priceRange && stateFilter.priceRange[1] < 1000000)) {
        filteredProducts = filteredProducts?.filter((prod) => {
            const price = discountPrice(prod.price ?? 0, prod.discountPercentage ?? 0)
            return (
                stateFilter.priceRange && price >= stateFilter.priceRange[0] && price <= stateFilter.priceRange[1]
            )
        })
    }

    if (SMALL) {
        filteredProducts = filteredProducts?.filter((prod,) => prod.discountPercentage && Math.round(prod.discountPercentage) <= 5
        )
    }

    if (AVERAGE) {
        filteredProducts = filteredProducts?.filter(prod => prod.discountPercentage && prod.discountPercentage >= 6 && Math.round(prod.discountPercentage) as number <= 10)
    }

    if (BIG) {
        filteredProducts = filteredProducts?.filter(prod => prod.discountPercentage && prod.discountPercentage >= 11 && Math.round(prod.discountPercentage) as number <= 20)
    }

    if (NONE) {
        filteredProducts = filteredProducts?.map(prod => prod)
    }

    if (FROM_TWO_STARS) {
        filteredProducts = filteredProducts?.filter(prod => Number(prod.rating?.toFixed(1)) < 3)
    }

    if (FROM_THREE_STARS) {
        filteredProducts = filteredProducts?.filter(prod => Number(prod.rating?.toFixed(1)) >= 3 && Number(prod.rating?.toFixed(1)) < 4)
    }

    if (FROM_FOUR_STARS) {
        filteredProducts = filteredProducts?.filter(prod => Number(prod.rating?.toFixed(1)) >= 4)
    }

    if (NO_STARS) {
        filteredProducts = filteredProducts?.map(prod => prod)
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
                            prices={prices}
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
                                <BrandFilter dispatch={dispatchFilter} products={products}/>
                            </ul>
                        </div>
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