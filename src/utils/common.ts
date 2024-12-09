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
    return titleArray.length > 20
        ? (titleArray.length = 20) && titleArray.join('') + '...'
        :
        str
}

export const nameLength = (str: string) => {
    const nameArray = str.split('')
    return nameArray.length > 6
        ? (nameArray.length = 6) && nameArray.join('') + '...'
        :
        str
}



export const usFirst = (str: string) => str ? str[0].toUpperCase() + str.slice(1) : str


export const dataReview = (date: string) => date.split('').splice(0, 10).join('')