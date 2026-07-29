import {CATEGORY_FILTERS} from "#utils/constants";

// state типизация отображения фильтров
export type FilterVisibilityStateType = {
    isVisibilityAvailability: boolean
    isVisibilityPrice: boolean
    isVisibilityBrand: boolean
    isVisibilityDiscount: boolean
    isVisibilityRating: boolean
}

// action типизация отображения фильтров
export type FilterVisibilityActionType =
    | { type: 'TOGGLE_VISIBILITY_AVAILABILITY' }
    | { type: 'TOGGLE_VISIBILITY_PRICE' }
    | { type: 'TOGGLE_VISIBILITY_BRAND' }
    | { type: 'TOGGLE_VISIBILITY_DISCOUNT' }
    | { type: 'TOGGLE_VISIBILITY_RATING' }


// state типизация фильтров
export type FilterStateType = {
    isInStock: boolean
    selectedBrands: string[]
    priceRange: [number, number] | undefined
    discountFilter: 'small' | 'average' | 'big' | 'none'
    ratingFilter: 'fromTwoStars' | 'fromThreeStars' | 'fromFourStars' | 'none'
}

// action типизация фильтров
export type FilterActionType =
    | { type: 'TOGGLE_IN_STOCK' }
    | { type: 'TOGGLE_BRAND', payload: string }
    | { type: 'PRICE_RANGE', payload: [number, number] }
    | { type: 'DISCOUNT_PRICE', payload: 'small' | 'average' | 'big' | 'none' }
    | { type: 'RATING_FILTER', payload: 'fromTwoStars' | 'fromThreeStars' | 'fromFourStars' | 'none' }
    | { type: 'RESET_FILTERS' }

// Типизация идентификаторов фильтров для UI (привязка кнопки "Показать товары")
export type FilterId = typeof CATEGORY_FILTERS[keyof typeof CATEGORY_FILTERS];









