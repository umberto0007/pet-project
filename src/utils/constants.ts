import {FooterNav} from '#models/proporties.types';
import {FaGithubSquare} from 'react-icons/fa';
import {BsTelegram, BsWhatsapp} from 'react-icons/bs';




export const BASE_URL = 'https://dummyjson.com/'



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

