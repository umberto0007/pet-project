import React from 'react';
import {Link} from 'react-router-dom';

import {v4 as uuidv4} from 'uuid';

import {ChildProps, ICategories} from '#types/models/product.types';


const HeaderCategoriesList: React.FC<ChildProps> = ({categories = [], amount = 0}) => {

    const severalCategories = categories.filter((_, i) => i < amount)


    return (
        <nav>
            <ul className='flex flex-wrap justify-between py-4'>
                {severalCategories.map(({name, slug}) =>
                    <Link to={`/${slug}`} key={uuidv4()}>
                        <li>
                            <h3 className='p-1 text-lg text-center hover:text-purple-700 transition-[0.3s] duration-[all] tracking-wide'>
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