import {FilterVisibilityActionType, FilterVisibilityStateType} from "#types/entities/categoryFilters";

export const filterVisibilityInitialState: FilterVisibilityStateType = {
    isVisibilityAvailability: false,
    isVisibilityPrice: false,
    isVisibilityBrand: false,
    isVisibilityDiscount: false,
    isVisibilityRating: false,
}

export const filterVisibilityReducer = (state: FilterVisibilityStateType, {type}: FilterVisibilityActionType) => {
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

