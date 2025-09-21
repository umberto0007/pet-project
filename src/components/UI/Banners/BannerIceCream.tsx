import {Link} from 'react-router-dom';

import {productsSliceApi} from '#redux/api/productsSlice.api';
import Loader from '#components/UI/Loader/Loader';
import {IProduct} from '#types/models/product.types';


const BannerIceCream = () => {
    const {data: products = {} as IProduct[], isLoading} = productsSliceApi.useGetProductsQuery('')

    return (
        <>
            {isLoading
                ?
                <Loader/>
                :
                <section className='rounded-lg bg-gradient-to-r from-pink-500 mt-24'>
                    <Link to={`/groceries/${products[27].id}`} className='flex'>
                        <div className='flex flex-col p-10'>
                            <h2 className='text-4xl mt-10 text-white tracking-wide'>{products[27].title}</h2>
                            <h3 className='text-2xl mt-10 font-light text-white tracking-wide'>{products[27].description}</h3>
                            <div className="bg-gradient-to-r from-yellow-300 mt-20 rounded-lg p-3 w-2/3">
                                <div className='text-2xl'>При заказе онлайн даем скидку!</div>
                            </div>
                            <div
                                className='p-3 border w-1/5 mt-10 rounded-lg text-center uppercase text-lg cursor-pointer text-white tracking-wide'>Купить
                            </div>
                        </div>
                            <img className='w-2/5' src={products?.[27]?.images?.[2] ?? '../../assets/stub/stub.webp'} alt="iceCream"/>
                    </Link>
                </section>
            }
        </>
    );
};

export default BannerIceCream;