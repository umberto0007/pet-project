export type FilterVisibilityStateType = {
    isVisibilityAvailability: boolean
    isVisibilityPrice: boolean
    isVisibilityBrand: boolean
    isVisibilityDiscount: boolean
    isVisibilityRating: boolean
}

export type FilterVisibilityActionType =
    | { type: 'TOGGLE_VISIBILITY_AVAILABILITY' }
    | { type: 'TOGGLE_VISIBILITY_PRICE' }
    | { type: 'TOGGLE_VISIBILITY_BRAND' }
    | { type: 'TOGGLE_VISIBILITY_DISCOUNT' }
    | { type: 'TOGGLE_VISIBILITY_RATING' }


export  type FilterStateType = {
    isInStock?: boolean
    isNotAvailable?: boolean
    selectedBrands?: string[]
    priceRange?: [number, number]
}


export type FilterActionType =
    | { type: 'TOGGLE_IN_STOCK' }
    | { type: 'TOGGLE_NOT_AVAILABLE' }
    | { type: 'TOGGLE_BRAND', payload: string }
    | { type: 'PRICE_RANGE', payload: [number, number] }

