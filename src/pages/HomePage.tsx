import React, {FC} from 'react';
import BannerProducts from '../components/BannerProducts';
import Categories from '../components/Categories';
import Brands from '../components/Brands';
import DiscountProducts from '../components/DiscountProducts';
import BannerCalvinKlein from '../components/BannerCalvinKlein';
import Fragrances from '../components/Fragrances';
import Skeleton from '../components/Skeleton';
import BannerIceCream from '../components/BannerIceCream';
import Groceries from '../components/Groceries';


const HomePage: FC = () => {
    return (
        <>
            <Categories amount={10}/>
            <BannerProducts/>
            <Brands amount={14}/>
            <DiscountProducts/>
            <BannerCalvinKlein/>
            <Fragrances/>
            <BannerIceCream/>
            <Groceries/>
        </>
    )
}

export default HomePage;