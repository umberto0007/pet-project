import {discountPrice} from "#utils/common";
import {ChangeProducts, IProduct} from "#types/models/product.types";
import {FilterStateType} from "#types/entities/categoryFilters";
import {MAX_FILTER_PRICE} from "#utils/constants";

export const filterProducts = (products: IProduct[], stateFilter: FilterStateType): ChangeProducts => {

    let filteredProducts = [...products]

    if (stateFilter.isInStock) {
        filteredProducts = filteredProducts?.filter(prod => prod.stock !== undefined && prod.stock > 0)
    }

    if (stateFilter.selectedBrands.length > 0) {
        const selectedBrands = stateFilter.selectedBrands as string[];
        filteredProducts = filteredProducts?.filter(
            (filteredProduct) => selectedBrands.length === 0 || selectedBrands.includes(filteredProduct.brand ?? '')
        );
    }

    if (stateFilter.priceRange && (stateFilter.priceRange[0] > 0 || stateFilter.priceRange[1] < MAX_FILTER_PRICE)) {
        filteredProducts = filteredProducts?.filter((prod) => {
            const price = discountPrice(prod.price ?? 0, prod.discountPercentage ?? 0)
            return (
                stateFilter.priceRange && price >= stateFilter.priceRange[0] && price <= stateFilter.priceRange[1]
            )
        })
    }


    switch (stateFilter.discountFilter) {
        case 'small':
            filteredProducts = filteredProducts?.filter((prod,) =>
                prod.discountPercentage !== undefined &&
                Math.round(prod.discountPercentage) <= 5
            )
            break;
        case 'average':
            filteredProducts = filteredProducts?.filter(prod =>
                prod.discountPercentage !== undefined &&
                prod.discountPercentage >= 6 && Math.round(prod.discountPercentage) <= 10)
            break;
        case 'big':
            filteredProducts = filteredProducts?.filter(prod =>
                prod.discountPercentage !== undefined &&
                prod.discountPercentage >= 11 && Math.round(prod.discountPercentage) <= 20)
            break;
        case 'none':
        default:
            // Ничего не фильтруем
            break;
    }

    switch (stateFilter.ratingFilter) {
        case 'fromTwoStars':
            filteredProducts = filteredProducts?.filter(prod =>
                Number(prod.rating?.toFixed(1)) < 3)
            break;
        case 'fromThreeStars':
            filteredProducts = filteredProducts?.filter(prod =>
                Number(prod.rating?.toFixed(1)) >= 3 &&
                Number(prod.rating?.toFixed(1)) < 4)
            break;
        case 'fromFourStars':
            filteredProducts = filteredProducts?.filter(prod =>
                Number(prod.rating?.toFixed(1)) >= 4)
            break;
        case 'none':
        default:
            // Ничего не фильтруем
            break;
    }

    return {filteredProducts}
}