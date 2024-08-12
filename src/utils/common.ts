import {Review} from '../models/product.types';

export const countReviews = (arr: Review[]) => {
    let stringArrLength = String(arr.length).split('')
    const lastEl = Number(stringArrLength.slice(-1).join())
    const prevEl = Number(stringArrLength[stringArrLength.length - 2])
    if (lastEl === 1 && prevEl !== 1) {
        return arr.length + ' отзыв'
    } else if ((lastEl > 1 && lastEl < 5) && (prevEl !== 1)) {
        return arr.length + ' отзыва'
    } else {
        return arr.length + ' отзывов'
    }
}

export const discountPrice = (price: number, discount: number) => {
    const realPrice = price * 10
    return discount < 5
        ?
        Math.round(realPrice - (realPrice / 100 * 30)) + ' ₽'
        :
        Math.round(realPrice - (realPrice / 100 * discount)) + ' ₽'
}

export const titleLength = (str: string) => {
    const titleArray = str.split('')
    return titleArray.length > 29
        ? (titleArray.length = 29) && titleArray.join('') + '...'
        :
        str
}