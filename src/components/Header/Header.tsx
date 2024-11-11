import {Link} from 'react-router-dom';

import {ROUTES} from '#utils/routes';
import {productsApi} from '#store/products/products.api';
import logo from '#assets/icons/logo.svg';
import SkeletonSearch from '#components/Skeleton/SkeletonSearch';
import SkeletonCategories from '#components/Skeleton/SkeletonCategories';
import HeaderForm from './HeaderForm';
import HeaderCategoriesList from './HeaderCategoriesList';
import HeaderErrorMassage from '../Error/HeaderErrorMassage';
import HeaderCatalog from '#components/Header/HeaderNavigate/HeaderCatalog';
import HeaderBasket from '#components/Header/HeaderNavigate/HeaderBasket';
import HeaderProfile from '#components/Header/HeaderNavigate/HeaderProfile';


const Header = () => {

    const {data: categories, isLoading, isError} = productsApi.useGetCategoriesQuery('')

    return (
        <header className='fixed top-0 left-0 right-0 z-40 bg-white'>
            <div className='container px-20 '>
                <div className='max-w-1440 h-20 m-auto flex justify-between items-center'>
                    <div className='w-28 h-6'>
                        <Link to={ROUTES.HOME}>
                            <img src={logo} alt='logo'/>
                        </Link>
                    </div>
                    {isLoading ? <SkeletonSearch/> : <HeaderForm/>}
                    <nav>
                        <ul className='flex items-center gap-5'>
                            <HeaderCatalog/>
                            <HeaderBasket isLoading={isLoading}/>
                            <HeaderProfile isLoading={isLoading}/>
                        </ul>
                    </nav>
                </div>
                {isError && <HeaderErrorMassage/>}
                {isLoading ?
                    <SkeletonCategories/>
                    :
                    <
                        HeaderCategoriesList
                        categories={categories}
                        amount={10}
                    />
                }
            </div>
            <hr/>
        </header>
    );
};

export default Header;