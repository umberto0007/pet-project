import React from 'react';
import {FilterProps} from "#types/models/product.types";
import {getUniqueBrands} from "#utils/products/getUniqueBrands";



const BrandFilter: React.FC<FilterProps> = ({filteredWithoutBrand, dispatch}) => {

    const productBrand = filteredWithoutBrand && getUniqueBrands(
        filteredWithoutBrand
            .map(filterProd => filterProd.brand)
            .filter(brand => brand !== undefined) as string[]
    )




    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'TOGGLE_BRAND', payload: event.target.value});
    };

    return (
        <li className='flex flex-col'>
            {
                productBrand?.length !== 0
                    ?
                    productBrand?.map(brand =>
                        <label className='flex gap-x-3 mt-3 items-center p-1' key={brand}>
                            <input
                                className='scale-[1.2] cursor-pointer'
                                type='checkbox'
                                value={brand}
                                onChange={handleChange}
                            />
                            <span className='mt-[2.5px]'>{brand}</span>
                        </label>
                    )
                    :
                    <span className='mt-[2.5px]'>Нет доступных брендов</span>
            }
        </li>
    );
};

export default BrandFilter;