import React from 'react';

import SkeletonProducts from '#components/UI/Skeleton/SkeletonProducts';
import FurnitureSlider from '#components/UI/Furniture/FurnitureSlider';
import {ChildProps} from "#types/models/product.types";


const Furniture: React.FC<ChildProps> = ({products}) => {

    return (
        <section className='mt-24'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-wide'>Удобство и комфорт</h2>
            {products && products.length > 0 ?
                <FurnitureSlider products={products}/>
                :
                <SkeletonProducts/>
            }
        </section>
    );
};

export default Furniture;