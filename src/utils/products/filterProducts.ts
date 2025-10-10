import {discountPrice} from "#utils/common";
import {IProduct} from "#types/models/product.types";
import {FilterStateType} from "#types/entities/categoryFilters";

export const filterProducts = (products: IProduct[], stateFilter: FilterStateType) => {
    const SMALL = stateFilter?.discountFilter === 'small'
    const AVERAGE = stateFilter?.discountFilter === 'average'
    const BIG = stateFilter?.discountFilter === 'big'
    const NONE = stateFilter?.discountFilter === 'none'

    const FROM_TWO_STARS = stateFilter?.ratingFilter === 'fromTwoStars'
    const FROM_THREE_STARS = stateFilter?.ratingFilter === 'fromThreeStars'
    const FROM_FOUR_STARS = stateFilter?.ratingFilter === 'fromFourStars'
    const NO_STARS = stateFilter?.ratingFilter === 'none'


    let filteredProducts = [...products]

    if (stateFilter.isInStock) {
        filteredProducts = filteredProducts?.filter(prod => prod.stock !== undefined && prod.stock > 0)
    }

    if (stateFilter.selectedBrands) {
        const selectedBrands = stateFilter.selectedBrands as string[];
        filteredProducts = filteredProducts?.filter(
            (filteredProduct) => selectedBrands.length === 0 || selectedBrands.includes(filteredProduct.brand ?? '')
        );
    }

    if ((stateFilter.priceRange && stateFilter.priceRange[0] > 0) || (stateFilter.priceRange && stateFilter.priceRange[1] < 1000000)) {
        filteredProducts = filteredProducts?.filter((prod) => {
            const price = discountPrice(prod.price ?? 0, prod.discountPercentage ?? 0)
            return (
                stateFilter.priceRange && price >= stateFilter.priceRange[0] && price <= stateFilter.priceRange[1]
            )
        })
    }

    if (SMALL) {
        filteredProducts = filteredProducts?.filter((prod,) => prod.discountPercentage && Math.round(prod.discountPercentage) <= 5
        )
    }

    if (AVERAGE) {
        filteredProducts = filteredProducts?.filter(prod => prod.discountPercentage && prod.discountPercentage >= 6 && Math.round(prod.discountPercentage) as number <= 10)
    }

    if (BIG) {
        filteredProducts = filteredProducts?.filter(prod => prod.discountPercentage && prod.discountPercentage >= 11 && Math.round(prod.discountPercentage) as number <= 20)
    }

    if (NONE) {
        filteredProducts = filteredProducts?.map(prod => prod)
    }

    if (FROM_TWO_STARS) {
        filteredProducts = filteredProducts?.filter(prod => Number(prod.rating?.toFixed(1)) < 3)
    }

    if (FROM_THREE_STARS) {
        filteredProducts = filteredProducts?.filter(prod => Number(prod.rating?.toFixed(1)) >= 3 && Number(prod.rating?.toFixed(1)) < 4)
    }

    if (FROM_FOUR_STARS) {
        filteredProducts = filteredProducts?.filter(prod => Number(prod.rating?.toFixed(1)) >= 4)
    }

    if (NO_STARS) {
        filteredProducts = filteredProducts?.map(prod => prod)
    }
    return filteredProducts;
}