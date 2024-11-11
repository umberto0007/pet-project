import {productsApi} from '#store/products/products.api';
import Loader from '#components/Loader/Loader';
import {Link} from 'react-router-dom';



const BannerCalvinKlein = () => {
    const {data: products, isLoading} = productsApi.useGetProductsQuery('')

    return (
        <>
            {isLoading
                ?
                <Loader/>
                :
                <section className='mt-24 bg-purple-100 rounded-lg'>
                    <Link to={`/fragrances/${products && products[5].id}`} className='flex'>
                        <div className='flex flex-col p-10'>
                            <h2 className='text-4xl mt-10 text-purple-900 tracking-wide'>{products && products[5].title}</h2>
                            <h3 className='text-2xl mt-10 text-grey font-light tracking-wide'>{products && products[5].description}</h3>
                            <div className='mt-12 bg-yellow-400 max-w-80 text-2xl p-2 rounded'>
                                Только у нас всего за
                                <span className='text-red-700 ml-3'>
                                    {products && Math.round(products[5].price)}
                                </span> ₽
                            </div>
                            <div className='mt-12 bg-blue-300 max-w-80 text-2xl p-2 rounded'>Купите сегодня и получите
                                скидку {products && products[5].discountPercentage * 100 - 2} %
                            </div>
                        </div>
                            <img className='w-2/5' src={products && products[5].images[2]} alt="calvinKlain"/>
                    </Link>
                </section>
            }
        </>
    );
};

export default BannerCalvinKlein;