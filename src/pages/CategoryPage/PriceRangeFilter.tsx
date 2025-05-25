import React, {useState} from 'react';
import Slider from 'react-slider'

import './PriceRangeFilter.css'
import {ChildProps} from '#types/models/product.types';


const PriceRangeFilter: React.FC<ChildProps> = (
    {
        onChange,
        minValue,
        maxValue
    }
) => {
    const [value, setValue] = useState({min: '', max: ''})
    const {min, max} = value

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newValue = event.target.value

        if (!newValue || isNaN(Number(newValue))) {
            newValue = '';
        }

        if (onChange && maxValue && index === 0 && Number(newValue)) {
            setValue({...value, min: newValue})
            onChange([Number(newValue), maxValue]);
        }

        if (onChange && minValue && index === 1 && Number(newValue)) {
            setValue({...value, max: newValue})
            onChange([minValue, Number(newValue)]);
        }
    };


    const onBlurHandlerInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newValue = Number(event.target.value)

        if (onChange && minValue && index === 0 && (newValue < minValue || newValue > Number(max))) {
            setValue({...value, min: minValue.toString()})
            onChange([minValue, Number(newValue)]);
        }
        if (onChange && maxValue && index === 1 && (newValue > maxValue || newValue < Number(min))) {
            setValue({...value, max: maxValue.toString()})
            onChange([Number(newValue), maxValue]);
        }
    }

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Enter') {
            onBlurHandlerInput({target: event.target} as React.FocusEvent<HTMLInputElement>, index); // создаем фейковое событие blur
        }
    }

    const handleSliderChange = (newRange: [number, number]) => {
        onChange && onChange(newRange); // Отправляем диапазон обратно в родительский компонент
        setValue(
            {
                ...value,
                min: newRange[0].toString(),
                max: newRange[1].toString()
            }
        )
    };


    return (
        <div className='mb-8'>
            <div className='flex items-center justify-between'>
                <input
                    onBlur={e => onBlurHandlerInput(e, 0)}
                    onKeyDown={e => handleEnterPress(e, 0)}
                    onChange={e => handleInputChange(e, 0)}
                    value={min}
                    placeholder={`от ${minValue}`}
                    autoComplete='off'
                    className='text-lg p-2 w-[7.5rem] h-12 border border-gray-400 rounded-s focus:border-purple-400'/>
                <div className='w-3 h-[0.1rem] bg-gray-400'/>
                <input
                    onBlur={e => onBlurHandlerInput(e, 1)}
                    onKeyDown={e => handleEnterPress(e, 1)}
                    onChange={e => handleInputChange(e, 1)}
                    value={max}
                    placeholder={`до ${maxValue}`}
                    autoComplete='off'
                    className='text-lg p-2 w-[7.5rem] h-12 border border-gray-400 rounded-s  focus:border-purple-400'/>
            </div>
            <div className='w-full mt-10'>
                <Slider
                    className='slider'
                    onChange={handleSliderChange}
                    value={[Number(min), Number(max) === 0 ? maxValue as number : Number(max)]}
                    min={minValue}
                    max={maxValue}
                />
            </div>
        </div>
    )
};

export default PriceRangeFilter;














