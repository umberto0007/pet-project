import React, {FC} from 'react';

import {productsSliceApi} from '#redux/api/productsSlice.api';
import BannerProducts from '#components/Banners/BannerProducts/BannerProducts';
import BannerCalvinKlein from '#components/Banners/BannerCalvinKlein';
import Fragrances from '../../components/Fragrances/Fragrances';
import BannerIceCream from '#components/Banners/BannerIceCream';
import Groceries from '#components/Groceries/Groceries';
import HomePageErrorMassage from '#components/Error/HomePageErrorMassage';
import Furniture from '#components/Furniture/Furniture';


const HomePage: FC = () => {

    const {isError} = productsSliceApi.useGetProductsQuery('')

    return (
        <>
            {isError ?
                <HomePageErrorMassage/>
                :
                <>
                    <BannerProducts/>
                    <Furniture/>
                    <BannerCalvinKlein/>
                    <Fragrances/>
                    <BannerIceCream/>
                    <Groceries/>
                </>
            }
        </>
    )
}

export default HomePage;