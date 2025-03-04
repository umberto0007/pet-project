import {FaGithubSquare} from 'react-icons/fa';
import {BsTelegram, BsWhatsapp} from 'react-icons/bs';

import {FooterNav} from '#types/entities/footerNav';

export const BASE_URL = 'https://dummyjson.com/'

export const AUTH_URL = 'https://api.escuelajs.co/api/v1/'

export const SIGNUP = 'signup'
export  const LOGIN = 'login'

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

// константы для рендера звезд в фильтре categoryFilters

export const TWO_STARS = 2
export const THREE_STARS = 3
export const FOUR_STARS = 4


// Допустимые значения рейтингов

export const RATING_VALUES = [2, 3, 4];