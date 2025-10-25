import React from 'react';

import {ChildProps, IProduct} from '#types/models/product.types';
import Description from '#pages/CardPage/Description';
import {LazyLoadImage} from "react-lazy-load-image-component";

const OneImageProduct: React.FC<ChildProps> = ({product = {} as IProduct}) => {

    return (
        <div className='mt-8 flex gap-10 justify-between'>
            <LazyLoadImage
                effect='blur'
                alt={product.title}
                threshold={200}
                className='w-1/2 shadow-md'
                src={product?.images?.[0]}
            />
            <div className='flex flex-col justify-between w-2/3 ml-5'>
                <Description product={product}/>
            </div>
        </div>
    );
};

export default OneImageProduct;