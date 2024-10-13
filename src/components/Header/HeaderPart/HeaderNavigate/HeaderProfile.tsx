import {productsApi} from '#store/dummyJson/products.api';

import {ReactComponent as PROFILE} from '#assets/profile.svg'
import SkeletonHeaderNav from '#components/Skeleton/SkeletonHeaderNav';



const HeaderProfile = () => {
    const {isLoading} = productsApi.useGetCategoriesQuery('')

    return (
        <>
            {isLoading
                ?
                <SkeletonHeaderNav/>
                :
                <li className='flex flex-col items-center p-2 hover:bg-grey-hov rounded-xl'>
                    <PROFILE/>
                    <div className='mt-2'>Профиль</div>
                </li>
            }
        </>
    );
};

export default HeaderProfile;