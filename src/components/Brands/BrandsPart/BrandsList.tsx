import React, {FC} from 'react';

import {productsApi} from '#store/dummyJson/products.api';
import {Amount} from '#models/proporties.types';

const BrandsList: FC<Amount> = ({amount}) => {

    const {data} = productsApi.useGetProductsQuery('')

    const topBrands = data && data.filter((_, i) => i < amount)

    return (
        <>
            {topBrands && topBrands.map(({brand, id}) =>
                <article className='border border-black uppercase text-xl tracking-wide p-4' key={id}>
                    {brand}
                </article>
            )}
        </>
    );
};

export default BrandsList;