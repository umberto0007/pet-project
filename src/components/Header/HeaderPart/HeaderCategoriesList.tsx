import React, {FC} from 'react';

import {v4 as uuidv4} from 'uuid';

import {productsApi} from '#store/dummyJson/products.api';
import {Amount} from '#models/proporties.types';

const HeaderCategoriesList: FC<Amount> = ({amount}) => {

    const {data: categories} = productsApi.useGetCategoriesQuery('')

    const severalCategories = categories && categories.filter((_, i) => i < amount)

    return (
        <>
            {severalCategories && severalCategories.map(({name}) =>
                <ul key={uuidv4()}>
                    <li>
                        <h3 className='text-lg p-2 text-center'>
                            {name}
                        </h3>
                    </li>
                </ul>
            )}
        </>
    );
};

export default HeaderCategoriesList;