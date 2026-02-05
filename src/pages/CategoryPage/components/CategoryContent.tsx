import React, {useEffect, useMemo, useReducer, useState} from 'react';

import {useLocation} from "react-router-dom";

import {IoIosArrowUp} from "react-icons/io";
import {ChildProps} from '#types/models/product.types';
import RatingFilter from "#pages/CategoryPage/components/RatingFilter";
import PriceRangeFilter from "#pages/CategoryPage/components/PriceRangeFilter";
import SkeletonCategoryPage from '#components/UI/Skeleton/SkeletonCategoryPage';
import ProductCard from '#components/UI/CardTemplate/ProductCard';
import DiscountFilter from "#pages/CategoryPage/components/DiscountFilter";
import {discountPrice, usFirst} from "#utils/common";
import AvailabilityFilter from "#pages/CategoryPage/components/AvailabilityFilter";
import BrandFilter from "#pages/CategoryPage/components/BrandFilter";
import {filterReducer, filterState} from "#pages/CategoryPage/state/filterReducer";
import {filterVisibilityInitialState, filterVisibilityReducer} from "#pages/CategoryPage/state/filterVisibilityReducer";
import {filterProducts} from "#utils/products/filterProducts";
import emptyStateImg from '#assets/no-products.png'


const CategoryContent: React.FC<ChildProps> = ({products, isLoading}) => {
    const [filterVisibilityState, filterVisibilityDispatch] = useReducer(filterVisibilityReducer, filterVisibilityInitialState)
    const [stateFilter, dispatchFilter] = useReducer(filterReducer, filterState)
    // Чтобы в дальнейшем react знал об изменении флага, т. е. отфильтровался ли массив внешними фильтрами,
    // флаг должен быть реактивным, зависеть от состояния useState, чтобы в дальнейшем использовать его в компоненте фильтра цен в useLayoutEffect
    const [changeProducts, setChangeProducts] = useState(false);

    const {filteredProducts, changeProducts: newChangeProducts} = filterProducts(products ?? [], stateFilter)


    // Создаем массив products с игнором priceRange, чтобы избежать самофильтрации диапазона цен при использовании слайдера
    let productsForPriceFilter = filterProducts(products ?? [], {
        ...stateFilter,
        priceRange: undefined
    }).filteredProducts

    // Для заголовка над фильтрами
    const {pathname} = useLocation();

    // Обновляем state только если значение изменилось
    useEffect(() => {
        if (changeProducts !== newChangeProducts) {
            setChangeProducts(newChangeProducts);
        }
    }, [newChangeProducts]);


    // Преобразуем и сортируем цены через filteredWithoutPrice,
    // используем useMemo для стабилизации ссылки filterPrices props.
    const filterPrices = useMemo(() => {
        if (!productsForPriceFilter) return []
        return productsForPriceFilter.map(prod =>
            discountPrice(prod.price ?? 0, prod.discountPercentage ?? 0))
            .sort((a, b) => a - b)
    }, [productsForPriceFilter])


    return (
        <>
            <h2 className='mt-6 text-3xl font-bold text-gray-800 tracking-wide'>{usFirst(pathname.slice(1))}
                <span className='text-lg text-gray-400 font-normal ml-4'>{filteredProducts.length}</span>
            </h2>
            <div className='flex mt-8'>
                <div className='min-w-[16rem] mr-5'>
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
                                <AvailabilityFilter
                                    dispatch={dispatchFilter}
                                    stateFilter={stateFilter}
                                />
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
                                changeProducts={changeProducts}
                            />
                        </div>
                    </>
                    {
                        (products?.[0].brand)
                        &&
                        <div className='mb-8'>
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
                                        stateFilter={stateFilter}
                                        dispatch={dispatchFilter}
                                        products={products}
                                    />
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
                                <DiscountFilter
                                    dispatch={dispatchFilter}
                                    stateFilter={stateFilter}
                                />
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
                                <RatingFilter
                                    dispatch={dispatchFilter}
                                    stateFilter={stateFilter}
                                />
                            </ul>
                        </div>
                    </div>
                </div>
                <>
                    {
                        isLoading
                            ?
                            (
                                <div className="flex flex-wrap gap-y-5">
                                    <SkeletonCategoryPage/>
                                </div>
                            )
                            :
                            filteredProducts.length > 0
                                ?
                                (
                                    <div className="flex flex-wrap gap-y-5">
                                        {filteredProducts.map(product => (
                                            <ProductCard
                                                key={product.id}
                                                {...product}
                                            />
                                        ))}
                                    </div>
                                )
                                :
                                (
                                    <div className="flex flex-col gap-y-10 w-full">
                                        <img
                                            src={emptyStateImg}
                                            alt="Нет товаров"
                                            className="max-w-2xl h-96 mx-auto"
                                        />

                                        <div className="text-center">
                                            <p className="text-3xl">
                                                По выбранным фильтрам товаров не найдено!
                                            </p>

                                            <p className="text-2xl mt-2 text-gray-600">
                                                Попробуйте снять некоторые фильтры
                                                <br/>
                                                или сбросить все фильтры
                                            </p>

                                            <button
                                                className="text-xl mt-8 bg-purple-600 px-6 py-3 rounded-lg min-w-80 hover:bg-purple-500 text-white transition"
                                                onClick={() => dispatchFilter({type: 'RESET_FILTERS'})}
                                            >
                                                Сбросить фильтры
                                            </button>
                                        </div>
                                    </div>
                                )
                    }
                </>
            </div>
        </>

    );
};

export default CategoryContent;