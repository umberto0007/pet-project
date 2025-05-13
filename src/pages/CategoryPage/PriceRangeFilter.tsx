import React, {useMemo, useState} from 'react';
import Slider from 'react-slider'

import './PriceRangeFilter.css'
import {ChildProps} from '#types/models/product.types';
import {discountPrice} from '#utils/common';


const PriceRangeFilter: React.FC<ChildProps> = ({filteredProducts}) => {

    const prices = useMemo(() => {
        if (!filteredProducts) return []
        return filteredProducts.map(prod =>
            discountPrice(prod.price ?? 0, prod.discountPercentage ?? 0))
            .sort((a, b) => a - b)
    }, [filteredProducts])

    const MIN = prices && prices[0]
    const MAX = prices && prices[prices.length - 1]


    const [values, setValues] = useState([MIN || 0, MAX || Infinity])
    const [value, setValue] = useState({min: '', max: ''})
    const {min, max} = value


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newValue = event.target.value

        if (!newValue || isNaN(Number(newValue))) {
            newValue = '';
        }

        if (MIN && index === 0 && Number(newValue)) {
            setValue({...value, min: newValue})
            setValues([Number(newValue) || MIN, values[1]])
        }

        if (MAX && index === 1 && Number(newValue)) {
            setValue({...value, max: newValue})
            setValues([values[0], Number(newValue) || MAX])
        }
    };


    const onBlurHandlerInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newValue = Number(event.target.value)

        if (MIN && index === 0 && (newValue < MIN || newValue > Number(max))) {
            setValue({...value, min: MIN.toString()})
            setValues([MIN, values[1]])
        }
        if (MAX && index === 1 && (newValue > MAX || newValue < Number(min))) {
            setValue({...value, max: MAX.toString()})
            setValues([values[0], MAX])
        }
    }

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Enter') {
            onBlurHandlerInput({target: event.target} as React.FocusEvent<HTMLInputElement>, index); // создаем фейковое событие blur
        }
    }


    return (
        <div className='mb-8'>
            <div className='flex items-center justify-between'>
                <input
                    onBlur={e => onBlurHandlerInput(e, 0)}
                    onKeyDown={e => handleEnterPress(e, 0)}
                    onChange={e => handleInputChange(e, 0)}
                    value={min || ''}
                    placeholder={`от ${MIN}`}
                    autoComplete='off'
                    className='text-lg p-2 w-[7.5rem] h-12 border border-gray-400 rounded-s focus:border-purple-400'/>
                <div className='w-3 h-[0.1rem] bg-gray-400'/>
                <input
                    onBlur={e => onBlurHandlerInput(e, 1)}
                    onKeyDown={e => handleEnterPress(e, 1)}
                    onChange={e => handleInputChange(e, 1)}
                    value={max || ''}
                    placeholder={`до ${MAX}`}
                    autoComplete='off'
                    className='text-lg p-2 w-[7.5rem] h-12 border border-gray-400 rounded-s  focus:border-purple-400'/>
            </div>
            <div className='w-full mt-10'>
                <Slider
                    className='slider'
                    onChange={
                        (newValues: number[]) => {
                            setValues(newValues)
                            setValue(
                                {
                                    ...value,
                                    max: newValues[1].toString(),
                                    min: newValues[0].toString()
                                }
                            )
                        }
                    }
                    value={values}
                    min={MIN}
                    max={MAX}
                />
            </div>
        </div>
    )
};

export default PriceRangeFilter;
