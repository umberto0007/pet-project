import {productsApi} from '#store/dummyJson/products.api';

import PROFILE from '#assets/profile.svg'
import SkeletonHeaderNav from '#components/Skeleton/SkeletonHeaderNav';



const HeaderProfile = () => {
    const {isLoading} = productsApi.useGetCategoriesQuery('')

    return (
        <>
            {isLoading
                ?
                <SkeletonHeaderNav/>
                :
                <li className='flex flex-col items-center max-w-16'>
                    <img className='w-7 h-7' src={PROFILE} alt='profile'/>
                    <div className='mt-2 hover:text-purple-700'>Профиль</div>
                </li>
            }
        </>
    );
};

export default HeaderProfile;