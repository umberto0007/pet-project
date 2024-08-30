import React, {FC} from 'react';

import {productsApi} from '#store/dummyJson/products.api';
import BannerProducts from '#components/Banners/BannerProducts/BannerProducts';
import Brands from '#components/Brands/Brands';
import DiscountProducts from '#components/DiscountProducts/DiscountProducts';
import BannerCalvinKlein from '#components/Banners/BannerCalvinKlein';
import Fragrances from '../../components/Fragrances/Fragrances';
import BannerIceCream from '#components/Banners/BannerIceCream';
import Groceries from '#components/Groceries/Groceries';
import HomePageErrorMassage from '#components/Error/HomePageErrorMassage';


const HomePage: FC = () => {

    const {isError} = productsApi.useGetProductsQuery('')

    return (
        <>
            {isError ?
                <HomePageErrorMassage/>
                :
                <>
                    <BannerProducts/>
                    <Brands/>
                    <DiscountProducts/>
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