import React, {FC} from 'react';
import logo from '../images/logo.svg'
import {Link} from 'react-router-dom';
import {ROUTES} from '../utils/routes';
import {Amount} from '../models/proporties.types';
import {productsApi} from '../store/dummyJson/products.api';
import {v4 as uuidv4} from 'uuid';
import SkeletonSearch from './Skeleton/SkeletonSearch';
import SkeletonHeaderNav from './Skeleton/SkeletonHeaderNav';
import {HEADER_NAV} from '../utils/constants';
import SkeletonCategories from './Skeleton/SkeletonCategories';


const Header: FC<Amount> = ({amount}) => {
    const {
        data: categories,
        isLoading,
        isError
    } = productsApi.useGetCategoriesQuery('')

    const someCategory = categories && categories.filter((_, i) => i < amount)


    return (
        <header>
            <div className='max-w-1440 h-20 m-auto flex justify-between items-center px-20 mb-3'>
                <div className='w-28 h-6'>
                    <Link to={ROUTES.HOME}>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                {isLoading
                    ?
                    <SkeletonSearch/>
                    :
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
                }

                {HEADER_NAV.map(({id, image, description, path}) =>
                    <nav key={id}>
                        <ul>
                            {isLoading
                                ?
                                <SkeletonHeaderNav/>
                                :
                                <li>
                                    <Link className='flex flex-col items-center max-w-16' to={path}>
                                        <img className='mb-2' src={image[0]} alt='catalog'/>
                                        <div>{description}</div>
                                    </Link>
                                </li>
                            }
                        </ul>
                    </nav>
                )}
            </div>
            <hr/>
            {isError && <h2 className='text-center mt-2 text-lg'>Произошла ошибка при загрузке!</h2>}
            <nav className='mt-2 container px-20 flex justify-between'>
                {isLoading && <SkeletonCategories/>}
                {someCategory && someCategory.map(({name}) =>
                    <ul key={uuidv4()}>
                        <li>
                            <h3 className='text-lg p-2 text-center'>
                                {name}
                            </h3>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;