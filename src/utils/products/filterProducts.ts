import {discountPrice} from "#utils/common";
import {ChangeProducts, IProduct} from "#types/models/product.types";
import {FilterStateType} from "#types/entities/categoryFilters";

export const filterProducts = (products: IProduct[], stateFilter: FilterStateType): ChangeProducts => {
    const SMALL = stateFilter?.discountFilter === 'small'
    const AVERAGE = stateFilter?.discountFilter === 'average'
    const BIG = stateFilter?.discountFilter === 'big'
    const NONE = stateFilter?.discountFilter === 'none'

    const FROM_TWO_STARS = stateFilter?.ratingFilter === 'fromTwoStars'
    const FROM_THREE_STARS = stateFilter?.ratingFilter === 'fromThreeStars'
    const FROM_FOUR_STARS = stateFilter?.ratingFilter === 'fromFourStars'
    const NO_STARS = stateFilter?.ratingFilter === 'none'


    let filteredProducts = [...products]
    // Создаем флаг, отоброжающий состояние массива цен, отфильтрован он внешними фильтрами или нет.
    let changeProducts = false

    if (stateFilter.isInStock) {
        filteredProducts = filteredProducts?.filter(prod => prod.stock !== undefined && prod.stock > 0)
        changeProducts = true
    }

    if (stateFilter.selectedBrands) {
        const selectedBrands = stateFilter.selectedBrands as string[];
        filteredProducts = filteredProducts?.filter(
            (filteredProduct) => selectedBrands.length === 0 || selectedBrands.includes(filteredProduct.brand ?? '')
        );
        changeProducts = true
    }

    if (stateFilter.priceRange && (stateFilter.priceRange[0] > 0 || stateFilter.priceRange[1] < 1000000)) {
        filteredProducts = filteredProducts?.filter((prod) => {
            const price = discountPrice(prod.price ?? 0, prod.discountPercentage ?? 0)
            return (
                stateFilter.priceRange && price >= stateFilter.priceRange[0] && price <= stateFilter.priceRange[1]
            )
        })
        changeProducts = true
    }

    if (SMALL) {
        filteredProducts = filteredProducts?.filter((prod,) => prod.discountPercentage && Math.round(prod.discountPercentage) <= 5
        )
        changeProducts = true
    }

    if (AVERAGE) {
        filteredProducts = filteredProducts?.filter(prod => prod.discountPercentage && prod.discountPercentage >= 6 && Math.round(prod.discountPercentage) as number <= 10)
        changeProducts = true
    }

    if (BIG) {
        filteredProducts = filteredProducts?.filter(prod => prod.discountPercentage && prod.discountPercentage >= 11 && Math.round(prod.discountPercentage) as number <= 20)
        changeProducts = true
    }

    if (NONE) {
        filteredProducts = filteredProducts?.map(prod => prod)
        changeProducts = true
    }

    if (FROM_TWO_STARS) {
        filteredProducts = filteredProducts?.filter(prod => Number(prod.rating?.toFixed(1)) < 3)
        changeProducts = true
    }

    if (FROM_THREE_STARS) {
        filteredProducts = filteredProducts?.filter(prod => Number(prod.rating?.toFixed(1)) >= 3 && Number(prod.rating?.toFixed(1)) < 4)
        changeProducts = true
    }

    if (FROM_FOUR_STARS) {
        filteredProducts = filteredProducts?.filter(prod => Number(prod.rating?.toFixed(1)) >= 4)
        changeProducts = true
    }

    if (NO_STARS) {
        filteredProducts = filteredProducts?.map(prod => prod)
        changeProducts = true
    }
    return {filteredProducts, changeProducts};
}