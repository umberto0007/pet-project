import React from 'react';

import {FilterProps} from "#types/models/product.types";
import {getUniqueBrands} from "#utils/products/getUniqueBrands";


const BrandFilter: React.FC<FilterProps> = ({
                                                products,
                                                hasProducts,
                                                stateFilter,
                                                dispatch,
                                            }) => {

    const productBrand = products && getUniqueBrands(
        products
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
                    productBrand?.map(brand => {

                        const isSelected = stateFilter?.selectedBrands?.includes(brand)

                        const selectedBrands = stateFilter?.selectedBrands ?? [];


                        const isDisabled =
                            !isSelected &&
                            !hasProducts?.({
                                selectedBrands: [...selectedBrands, brand],
                            });




                        return (
                            <label className='flex gap-x-3 mt-3 items-center p-1'
                                   key={brand}>
                                <input type="checkbox"
                                       className='scale-[1.2] cursor-pointer'
                                       value={brand}
                                       onChange={handleChange}
                                       checked={isSelected}
                                       disabled={isDisabled}
                                />
                                <span className='mt-[2.5px]'>{brand}</span>
                            </label>
                        )
                    })
                    :
                    <span className='mt-[2.5px]'>Нет доступных брендов</span>} </li>);
};

export default BrandFilter;

