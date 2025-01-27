import {productsSliceApi} from '#redux/api/productsSlice.api';
import BannerProducts from '#components/UI/Banners/BannerProducts/BannerProducts';
import BannerCalvinKlein from '#components/UI/Banners/BannerCalvinKlein';
import Fragrances from '#components/UI/Fragrances/Fragrances';
import BannerIceCream from '#components/UI/Banners/BannerIceCream';
import Groceries from '#components/UI/Groceries/Groceries';
import HomePageErrorMassage from '#components/UI/Error/HomePageErrorMassage';
import Furniture from '#components/UI/Furniture/Furniture';


const HomePage = () => {

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