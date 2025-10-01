import {FaGithubSquare} from 'react-icons/fa';
import {BsTelegram, BsWhatsapp} from 'react-icons/bs';

import {FooterNav} from '#types/entities/footerNav';
import {FilterStateType} from "#types/entities/categoryFilters";


export const BASE_URL = 'https://dummyjson.com/'

export const AUTH_URL = 'https://api.escuelajs.co/api/v1/'

export const SIGNUP = 'signup'
export const LOGIN = 'login'

export const FOOTER_NAV: FooterNav[] = [
    {
        id: 1,
        icon: FaGithubSquare,
        path: 'https://github.com/umberto0007'
    },
    {
        id: 2,
        icon: BsWhatsapp,
        path: 'https://wa.me/79202920447'
    },
    {
        id: 3,
        icon: BsTelegram,
        path: 'https://t.me/AntonZheltyakov'
    }
]




// Колличество отображаемых звезд для функции RatingValues
export const STARS_COUNT = [2, 3, 4]

// Костнанта для фильтра рейтинга
type RatingFilter = NonNullable<FilterStateType['ratingFilter']>

export const RATING_VALUES: { value: RatingFilter } [] =
    [
        {value: 'fromTwoStars'},
        {value: 'fromThreeStars'},
        {value: 'fromFourStars'},
        {value: 'none'}
    ]


// Допустимые значения скидок
type DiscountFilter = NonNullable<FilterStateType['discountFilter']>

export const DISCOUNT_VALUES: { value: DiscountFilter; discount: string } [] =
    [
        {discount: '0-5%', value: 'small'},
        {discount: '6-10%', value: 'average'},
        {discount: '11-20%', value: 'big'},
        {discount: 'Показать все', value: 'none'},
    ]


