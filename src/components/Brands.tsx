import React, {FC} from 'react';
import {productsApi} from '../store/dummyJson/products.api';
import {Amount} from '../models/proporties.types';

const Brands: FC<Amount> = ({amount}) => {

    const {data, isError, isLoading} = productsApi.useGetProductsQuery('')

    const topBrands = data && data.filter((_, i) => i < amount)

    return (
        <section className='mt-24'>
            <h2 className='text-2xl'>Топ брендов</h2>
            {isLoading &&
                <h2 className='text-center text-lg mt-3'>Загрузка...</h2>
            }
            {isError && <h2 className='text-center text-lg mt-3'>Произошла ошибка при загрузке!</h2>}
            <div className='flex gap-4 flex-wrap mt-6 justify-center'>
                {topBrands && topBrands.map(({brand, id}) =>
                    <article className='border border-black uppercase text-xl tracking-wide p-4' key={id}>
                        {brand}
                    </article>
                )}
            </div>
        </section>
    );
};

export default Brands;