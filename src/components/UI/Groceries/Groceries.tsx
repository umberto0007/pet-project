import React from 'react';

import SkeletonProducts from '#components/UI/Skeleton/SkeletonProducts';
import GroceriesSlider from './GroceriesSlider';
import {ChildProps} from "#types/models/product.types";




const Groceries: React.FC<ChildProps>  = ({products}) => {

    return (
        <section className='mt-24'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-wide'>Продукты</h2>
            {products && products.length > 0
                ?
                <GroceriesSlider products={products}/>
                :
                <SkeletonProducts/>
            }
        </section>
    );
};

export default Groceries;