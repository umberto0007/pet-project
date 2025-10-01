import React from 'react';
import {FilterProps} from "#types/models/product.types";
import {getUniqueBrands} from "#utils/common";

const BrandFilter:React.FC<FilterProps> = ({products, dispatch}) => {

    const productBrand = products && getUniqueBrands(
        products
            .map(prod => prod.brand)
            .filter(brand => brand !== undefined) as string[]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'TOGGLE_BRAND', payload: event.target.value});
    };

    return (
            <li className='flex flex-col'>
                {
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
                }
            </li>
    );
};

export default BrandFilter;