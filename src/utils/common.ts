// Приведение цены к большей с учетом кол-ва товаров
export const discountPrice = (price: number, discount: number, quantity: number = 1) => {
    const realPrice = price * 10
    return discount < 5
        ?
        Math.round(realPrice - (realPrice / 100 * 30)) * quantity
        :
        Math.round(realPrice - (realPrice / 100 * discount)) * quantity
}

// Обрезка длины строки
export const strLength = (str: string, num: number) => {
    const titleArray = str.split('')
    return titleArray.length > num
        ? (titleArray.length = num) && titleArray.join('') + '...'
        :
        str
}

// Первая заглавная буква
export const usFirst = (str: string) => str ? str[0].toUpperCase() + str.slice(1) : str


// Преобразуем дату, время, год согласно евро формату
export const dataReview = (date: string) => date
    .split('')
    .splice(0, 10)
    .join('')
    .split('-')
    .reverse()
    .join('-')

// Проверка на корректный адрес url img
export const urlImg = (str: string) => str.includes("'") ? str.replace("'", "%27") : str








