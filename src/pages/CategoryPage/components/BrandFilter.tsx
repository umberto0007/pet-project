import React, {useState} from 'react';

import {FilterProps} from "#types/models/product.types";
import {getUniqueBrands} from "#utils/products/getUniqueBrands";
import {CATEGORY_FILTERS} from "#utils/constants";
import ShowProductsButton from "#components/UI/Button/ShowProductsButton";


const BrandFilter: React.FC<FilterProps> = (
    {
        products,
        dispatch,
        stateFilter,
        applyButtonFilter,
        setApplyButtonFilter
    }
) => {

    const [lastChangBrand, setLastChangeBrand] = useState<string | null>(null)

    const productBrand = products && getUniqueBrands(
        products
            .map(filterProd => filterProd.brand)
            .filter(brand => brand !== undefined) as string[]
    )


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'TOGGLE_BRAND', payload: event.target.value});
        setApplyButtonFilter?.(CATEGORY_FILTERS.BRAND);
        setLastChangeBrand(event.target.value);
    };


    return (
        <li className='flex flex-col'>
            {
                productBrand?.map(brand => {

                    return (
                        <label className='flex gap-x-3 mt-3 items-center p-1 relative'
                               key={brand}
                        >
                            <input
                                type="checkbox"
                                className='scale-[1.2] cursor-pointer'
                                value={brand}
                                onChange={handleChange}
                                checked={stateFilter?.selectedBrands?.includes(brand)}
                            />
                            <span className='mt-[2.5px]'>{brand}</span>
                            {applyButtonFilter === CATEGORY_FILTERS.BRAND && lastChangBrand === brand && (
                                <ShowProductsButton/>
                            )}
                        </label>
                    )
                })
            }
        </li>
    );
};

export default BrandFilter;

