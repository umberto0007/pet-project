import {Link} from 'react-router-dom';

import {ROUTES} from '#utils/routes';
import {productsApi} from '#store/dummyJson/products.api';

import logo from '#assets/logo.svg';
import SkeletonSearch from '#components/Skeleton/SkeletonSearch';
import SkeletonCategories from '#components/Skeleton/SkeletonCategories';
import HeaderForm from './HeaderPart/HeaderForm';
import HeaderCategoriesList from './HeaderPart/HeaderCategoriesList';
import HeaderErrorMassage from '../Error/HeaderErrorMassage';
import HeaderCatalog from './HeaderPart/HeaderNavigate/HeaderCatalog';
import HeaderBasket from './HeaderPart/HeaderNavigate/HeaderBasket';
import HeaderProfile from './HeaderPart/HeaderNavigate/HeaderProfile';







const Header = () => {

    const {isLoading, isError} = productsApi.useGetCategoriesQuery('')

    return (
        <header>
            <div className='max-w-1440 h-20 m-auto flex justify-between items-center px-20 mb-3'>
                <div className='w-28 h-6'>
                    <Link to={ROUTES.HOME}>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                {isLoading ? <SkeletonSearch/> : <HeaderForm/>}
                <nav>
                    <ul className='flex items-center gap-6'>
                        <HeaderCatalog/>
                        <HeaderBasket/>
                        <HeaderProfile/>
                    </ul>
                </nav>
            </div>
            <hr/>
            {isError && <HeaderErrorMassage/>}
            <nav className='mt-2 container px-20 flex flex-wrap justify-between'>
                {isLoading ? <SkeletonCategories/> : <HeaderCategoriesList amount={10}/>}
            </nav>
        </header>
    );
};

export default Header;