import React, {FC} from 'react';

import {v4 as uuidv4} from 'uuid';

import {productsApi} from '#store/dummyJson/products.api';
import {Amount} from '#models/proporties.types';
import {Link} from 'react-router-dom';



const HeaderCategoriesList: FC<Amount> = ({amount}) => {

    const {data: categories} = productsApi.useGetCategoriesQuery('')

    const severalCategories = categories && categories.filter((_, i) => i < amount)



    return (
        <nav>
            <ul className='flex flex-wrap justify-between py-4'>
                {severalCategories && severalCategories.map(({name, slug}) =>
                    <Link to={`/${slug}`}>
                        <li key={uuidv4()}>
                            <h3 className='text-lg text-center hover:text-purple-700'>
                                {name}
                            </h3>
                        </li>
                    </Link>
                )}
            </ul>
        </nav>
    );
};

export default HeaderCategoriesList;