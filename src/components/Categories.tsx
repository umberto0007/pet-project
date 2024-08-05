import React, {FC} from 'react';
import {v4 as uuidv4} from 'uuid';
import {productsApi} from '../store/dummyJson/products.api';
import {Amount} from '../models/proporties.types';



const Categories: FC<Amount> = ({amount}) => {
    const {
        data: categories,
        isLoading,
        isError
    } = productsApi.useGetCategoriesQuery('')


    const someCategory = categories && categories.filter((_, i) => i < amount)


    return (
        <nav className='mt-2'>
            {isLoading &&
               <h2 className='text-center text-lg mt-3'>Загрузка...</h2>
            }
            {isError && <h2 className='text-center text-lg mt-3'>Произошла ошибка при загрузке!</h2>}
            <ul className='flex justify-between'>
                {someCategory && someCategory.map(({name, slug}) =>
                    <li key={uuidv4()}>
                        <h3 className='text-lg p-2 text-center'>
                            {name}
                        </h3>
                    </li>
                )}
            </ul>
        </nav>
    )
};

export default Categories;
