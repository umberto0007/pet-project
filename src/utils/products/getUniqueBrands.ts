//Уникальные бренды в фильтрах categoryPage

export const getUniqueBrands = (arr: string[]) => {
    return Array.from(new Set(arr.filter(Boolean)))
}