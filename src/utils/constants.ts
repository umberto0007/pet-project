import {HeaderNav} from '../models/proporties.types';
import {ROUTES} from '../utils/routes';
import {IProduct} from '../models/product.types';


export const BASE_URL = 'https://dummyjson.com/'

export const HEADER_NAV: HeaderNav[] = [
    {
        id: 1,
        image: ['https://mywebicons.ru/i/png/ad2c9e0a9c46d5f3de817714c17d64cd.png'],
        description: 'Каталог',
        path: ROUTES.CATALOG
    },
    {
        id: 2,
        image: ['https://mywebicons.ru/i/png/2d1838bd5b731e64a54439dac82b3a4e.png'],
        description: 'Корзина',
        path: ROUTES.CART
    },
    {
        id: 3,
        image: ['https://mywebicons.ru/i/png/18b3991b5ec24ce451f3e7a1af888c30.png'],
        description: 'Профиль',
        path: ROUTES.PROFILE
    }
]



