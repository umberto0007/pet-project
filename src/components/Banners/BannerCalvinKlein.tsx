import {productsSliceApi} from '#redux/api/productsSlice.api';
import Loader from '#components/Loader/Loader';
import {Link} from 'react-router-dom';
import {IProduct} from '#types/models/product.types';



const BannerCalvinKlein = () => {
    const {data: products = {} as IProduct[], isLoading} = productsSliceApi.useGetProductsQuery('')

    return (
        <>
            {isLoading
                ?
                <Loader/>
                :
                <section className='mt-24 bg-purple-100 rounded-lg'>
                    <Link to={`/fragrances/${products[5].id}`} className='flex'>
                        <div className='flex flex-col p-10'>
                            <h2 className='text-4xl mt-10 text-purple-900 tracking-wide'>{products[5].title}</h2>
                            <h3 className='text-2xl mt-10 text-grey font-light tracking-wide'>{products[5].description}</h3>
                            <div className='mt-12 bg-yellow-400 max-w-80 text-2xl p-2 rounded'>
                                Только у нас всего за
                                <span className='text-red-700 ml-3'>
                                    {Math.round(products[5].price ?? 0)}
                                </span> ₽
                            </div>
                            <div className='mt-12 bg-blue-300 max-w-80 text-2xl p-2 rounded'>Купите сегодня и получите
                                скидку {(products[5]?.discountPercentage ?? 0) * 100 - 2} %
                            </div>
                        </div>
                            <img className='w-2/5' src={products?.[5]?.images?.[2] ?? '../../assets/stub/stub.webp'} alt="calvinKlain"/>
                    </Link>
                </section>
            }
        </>
    );
};

export default BannerCalvinKlein;