import {productsSliceApi} from '#redux/api/productsSlice.api';
import BannerProducts from '#components/UI/Banners/BannerProducts/BannerProducts';
import BannerCalvinKlein from '#components/UI/Banners/BannerCalvinKlein';
import Fragrances from '#components/UI/Fragrances/Fragrances';
import BannerIceCream from '#components/UI/Banners/BannerIceCream';
import Groceries from '#components/UI/Groceries/Groceries';
import HomePageErrorMassage from '#components/UI/Error/HomePageErrorMassage';
import Furniture from '#components/UI/Furniture/Furniture';
import Loader from "#components/UI/Loader/Loader";


const HomePage = () => {

    const {data, isError, isLoading, error} = productsSliceApi.useGetProductsQuery()

    if (isLoading) return <Loader/>
    if (isError) {
        console.warn('Products API error:', error)
        return <HomePageErrorMassage/>;
    }

    return (
        <>
            <BannerProducts products={data}/>
            <Furniture products={data}/>
            <BannerCalvinKlein products={data}/>
            <Fragrances products={data}/>
            <BannerIceCream products={data}/>
            <Groceries products={data}/>
        </>
    )
}

export default HomePage;