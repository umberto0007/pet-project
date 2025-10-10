import {FilterActionType, FilterStateType} from "#types/entities/categoryFilters";

export const filterState: FilterStateType = {
    isInStock: false,
    selectedBrands: [],
    priceRange: [0, 1000000],
    discountFilter: undefined,
    ratingFilter: undefined,
}


export const filterReducer = (state: FilterStateType, action: FilterActionType) => {
    switch (action.type) {
        case 'TOGGLE_IN_STOCK':
            return {
                ...state,
                isInStock: !state.isInStock
            }
        case 'TOGGLE_BRAND':
            if (state.selectedBrands?.includes(action.payload)) {
                return {
                    ...state,
                    selectedBrands: state.selectedBrands.filter(brand => brand !== action.payload)
                }
            }
            return {
                ...state,
                selectedBrands: state.selectedBrands && [...state.selectedBrands, action.payload]
            }
        case 'PRICE_RANGE':
            return {...state, priceRange: action.payload}
        case 'DISCOUNT_PRICE':
            return {...state, discountFilter: action.payload}
        case 'RATING_FILTER':
            return {...state, ratingFilter: action.payload}
        default:
            return state
    }
}
