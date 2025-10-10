import {IProduct} from "#types/models/product.types";

// Суммируем количество всех товаров
export const getTotalItemsInCart = (cart: IProduct[]) => {
    return cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
};