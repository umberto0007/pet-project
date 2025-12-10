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


export type FilterStateType = {
    isInStock?: boolean
    selectedBrands?: string[]
    priceRange?: [number, number]
    discountFilter?: 'small' | 'average' | 'big' | 'none'
    ratingFilter?: 'fromTwoStars' | 'fromThreeStars' | 'fromFourStars' | 'none'
}


export type FilterActionType =
    | { type: 'TOGGLE_IN_STOCK' }
    | { type: 'TOGGLE_BRAND', payload: string }
    | { type: 'PRICE_RANGE', payload: [number, number] }
    | { type: 'DISCOUNT_PRICE', payload: 'small' | 'average' | 'big' | 'none' }
    | { type: 'RATING_FILTER', payload: 'fromTwoStars' | 'fromThreeStars' | 'fromFourStars' | 'none' }








