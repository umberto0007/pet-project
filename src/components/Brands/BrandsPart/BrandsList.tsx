import React, {FC} from 'react';

import {productsApi} from '#store/dummyJson/products.api';
import {Amount} from '#models/proporties.types';
import SkeletonBrands from '#components/Skeleton/SkeletonBrands';

const BrandsList: FC = () => {

    const {data: brands} = productsApi.useGetBrandsQuery('')


    return (
        <>

            {brands && brands.map(({id, image}) =>
                <article key={id}>
                    <div className='flex justify-center items-center p-5 w-32 h-20 bg-gray-100 rounded-lg'>
                        <img src={image} alt='brand'/>
                    </div>
                </article>
            )}
        </>
    );
};

export default BrandsList;