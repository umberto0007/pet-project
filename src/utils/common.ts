import {IProduct} from '#types/models/product.types';

export const discountPrice = (price: number, discount: number) => {
    const realPrice = price * 10
    return discount < 5
        ?
        Math.round(realPrice - (realPrice / 100 * 30)) + ' ₽'
        :
        Math.round(realPrice - (realPrice / 100 * discount)) + ' ₽'
}

export const strLength = (str: string, num: number) => {
    const titleArray = str.split('')
    return titleArray.length > num
        ? (titleArray.length = num) && titleArray.join('') + '...'
        :
        str
}

export const usFirst = (str: string) => str ? str[0].toUpperCase() + str.slice(1) : str


export const dataReview = (date: string) => date.split('').splice(0, 10).join('')

export const getTotalItemsInCart = (cart: IProduct[]) => {
    return cart.reduce((acc, item) => acc + (item.quantity || 1), 0); // Суммируем количество всех товаров
};
