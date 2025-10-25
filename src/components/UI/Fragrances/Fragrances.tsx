import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import FragrancesSlider from './FragrancesSlider';
import {ChildProps} from '#types/models/product.types';
import Loader from '#components/UI/Loader/Loader';


const Fragrances: React.FC<ChildProps> = ({products}) => {

    return (
        <section className='mt-24'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-wide'>Ароматы</h2>
            {
                products && products.length > 0
                    ?
                    <FragrancesSlider products={products}/>
                    :
                    <Loader/>
            }
        </section>
    );
};

export default Fragrances;