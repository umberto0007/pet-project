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
                            <HeaderBasket/>
                            <HeaderProfile/>
                        </ul>
                    </nav>
                </div>
                {isError && <HeaderErrorMassage/>}
                {isLoading ? <SkeletonCategories/> : <HeaderCategoriesList amount={10}/>}
            </div>
            <img src="/images/brands/" alt=""/>
            <hr/>
        </header>
    );
};

export default Header;