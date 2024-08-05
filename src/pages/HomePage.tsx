import React, {FC} from 'react';
import BannerProducts from '../components/BannerProducts';
import Categories from '../components/Categories';
import Brands from '../components/Brands';
import DiscountProducts from '../components/DiscountProducts';


const HomePage: FC = () => {
    return (
        <>
            <Categories amount={10}/>
            <BannerProducts/>
            <Brands amount={7}/>
            <DiscountProducts/>
        </>
    )
}

export default HomePage;