import React, {FC} from 'react';
import {productsApi} from '../store/dummyJson/products.api';
import {Amount} from '../models/proporties.types';

const Brands: FC<Amount> = ({amount}) => {

    const {data} = productsApi.useGetProductsQuery('')

    const topBrands = data && data.filter((_, i) => i < amount)

    return (
        <section className='mt-24'>
            <h2 className='text-2xl'>Популярные бренды</h2>
            <div className='flex gap-4 flex-wrap mt-14'>
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