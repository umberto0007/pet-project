import {IProduct} from '#types/models/product.types';

export type FilterVisibilityStateType = {
    isAvailability: boolean
    isPrice: boolean
    isBrand: boolean
    isDiscount: boolean
    isRating: boolean
}

export type FilterVisibilityActionType =
    | { type: 'TOGGLE_AVAILABILITY' }
    | { type: 'TOGGLE_PRICE' }
    | { type: 'TOGGLE_BRAND' }
    | { type: 'TOGGLE_DISCOUNT' }
    | { type: 'TOGGLE_RATING' }


export  type FilterStateType = {
    isInStock: boolean
    isNotAvailable: boolean
}


export type FilterActionType =
    | { type: 'TOGGLE_IN_STOCK'}
    | { type: 'TOGGLE_NOT_AVAILABLE'}

