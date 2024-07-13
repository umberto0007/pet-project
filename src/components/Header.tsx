import React, {FC} from 'react';
import logo from '../images/logo.svg'
import {Link} from 'react-router-dom';
import {ROUTES} from '../utils/routes';
import CATALOG from '../images/catalog.svg'
import BASKET from '../images/basket.svg'
import PROFILE from '../images/profile.svg'


const Header: FC = () => {
    return (
        <header>
            <div className='max-w-1440 h-20 m-auto flex justify-between items-center px-20'>
                <div className='w-28 h-6'>
                    <Link to={ROUTES.HOME}>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                <form className='flex items-center bg-light-grey min-w-754 rounded-lg'>
                    <div className='w-4 h-4 m-3'>
                        <svg className='w-full h-full fill-grey'>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/search.svg#search`}/>
                        </svg>
                    </div>
                    <input className='w-full mr-2 bg-light-grey outline-0 placeholder-grey'
                           type='search'
                           name='search'
                           placeholder='Поиск'
                           autoComplete='off'
                    />
                </form>
                <div className='flex gap-x-8'>
                    <Link className='flex flex-col items-center max-w-16' to={ROUTES.CATALOG}>
                        <img className='h-6 w-7 mb-2' src={CATALOG} alt='catalog'/>
                        <div>Каталог</div>
                    </Link>
                    <Link className='flex flex-col items-center max-w-16' to={ROUTES.CART}>
                        <img className='h-6 w-7 mb-2' src={BASKET} alt='basket'/>
                        <div>Корзина</div>
                    </Link>
                    <div className='flex flex-col items-center max-w-16'>
                        <img className='h-6 w-7 mb-2' src={PROFILE} alt='profile'/>
                        <div>Профиль</div>
                    </div>
                </div>
            </div>
            <hr/>
        </header>
    );
};

export default Header;