export type StateType = {
    isAvailability: boolean,
    isPrice: boolean,
    isBrand: boolean,
    isDiscount: boolean
}

export type ActionType =
    | { type: 'TOGGLE_AVAILABILITY' }
    | { type: 'TOGGLE_PRICE' }
    | { type: 'TOGGLE_BRAND' }
    | { type: 'TOGGLE_DISCOUNT' };
