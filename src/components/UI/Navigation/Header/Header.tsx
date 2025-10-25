import {Link} from 'react-router-dom';

import {ROUTES} from '#utils/routes';
import {productsSliceApi} from '#redux/api/productsSlice.api';
import logo from '#assets/icons/logo.svg';
import SkeletonSearch from '#components/UI/Skeleton/SkeletonSearch';
import SkeletonCategories from '#components/UI/Skeleton/SkeletonCategories';
import HeaderSearch from './HeaderSearch';
import HeaderCategoriesList from './HeaderCategoriesList';
import HeaderErrorMassage from '#components/UI/Error/HeaderErrorMassage';
import HeaderCatalog from '#components/UI/Navigation/Header/HeaderNavigate/HeaderCatalog';
import HeaderBasket from '#components/UI/Navigation/Header/HeaderNavigate/HeaderBasket';
import HeaderProfile from '#components/UI/Navigation/Header/HeaderNavigate/HeaderProfile/HeaderProfile';


const Header = () => {

    const {data: categories, isLoading, isError} = productsSliceApi.useGetCategoriesQuery()

    return (
        <header className='fixed w-full top-0 z-10 bg-white'>
            <div className='container px-20 '>
                <div className='max-w-1440 h-24 m-auto flex justify-between items-center'>
                    <div className='w-28 h-6 mr-5 shrink-0'>
                        <Link to={ROUTES.HOME}>
                            <img src={logo} alt='logo'/>
                        </Link>
                    </div>
                    {isLoading ? <SkeletonSearch/> : <HeaderSearch/>}
                    <nav>
                        <ul className='flex items-center gap-x-2 ml-5'>
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