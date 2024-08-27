import React, {FC} from 'react';
import BannerProducts from '../components/BannerProducts';
import Brands from '../components/Brands';
import DiscountProducts from '../components/DiscountProducts';
import BannerCalvinKlein from '../components/BannerCalvinKlein';
import Fragrances from '../components/Fragrances';
import BannerIceCream from '../components/BannerIceCream';
import Groceries from '../components/Groceries';
import SkeletonCategories from '../components/Skeleton/SkeletonCategories';



const HomePage: FC = () => {
    return (
        <>
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