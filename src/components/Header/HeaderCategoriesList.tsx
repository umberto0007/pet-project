import React from 'react';
import {Link} from 'react-router-dom';

import {v4 as uuidv4} from 'uuid';

import {ChildProps} from '#models/product.types';


const HeaderCategoriesList: React.FC<ChildProps> = ({categories, amount}) => {

    const severalCategories = categories && categories.filter((_, i) => amount && i < amount)


    return (
        <nav>
            <ul className='flex flex-wrap justify-between py-4'>
                {severalCategories && severalCategories.map(({name, slug}) =>
                    <Link to={`/${slug}`} key={uuidv4()}>
                        <li>
                            <h3 className='text-lg text-center hover:text-purple-700 transition-[0.4s] duration-[all] tracking-wide'>
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