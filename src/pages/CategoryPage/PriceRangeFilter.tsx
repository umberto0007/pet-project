import React, {useState} from 'react';
import Slider from 'react-slider'

import './PriceRangeFilter.css'


const MIN = 100
const MAX = 12000

const PriceRangeFilter = () => {

    const [values, setValues] = useState([MIN, MAX])
    const [minValue, setMinValue] = useState('')
    const [maxValue, setMaxValue] = useState('')


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newValue = event.target.value

        if (!newValue || isNaN(parseInt(newValue))) {
            newValue = '';
        }

        if (index === 0 && Number(newValue)) {
            setMinValue(newValue)
            setValues([parseInt(newValue) || MIN, values[1]])
        }

        if (index === 1 && Number(newValue)) {
            setMaxValue(newValue)
            setValues([values[0], parseInt(newValue) || MAX])
        }
    };


    const onBlurHandlerInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newValue = event.target.value
        if (index === 0 && (parseInt(newValue) < MIN || parseInt(newValue) > parseInt(maxValue))) {
            setMinValue(MIN.toString())
            setValues([MIN, values[1]])
        }
        if (index === 1 && (parseInt(newValue) > MAX || parseInt(newValue) < parseInt(minValue))) {
            setMaxValue(MAX.toString())
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
                    value={minValue || ''}
                    placeholder={`от ${MIN}`}
                    autoComplete='off'
                    className='text-lg p-2 w-[7.5rem] h-12 border border-gray-400 rounded-s focus:border-purple-400'/>
                <div className='w-3 h-[0.1rem] bg-gray-400'/>
                <input
                    onBlur={e => onBlurHandlerInput(e, 1)}
                    onKeyDown={e => handleEnterPress(e, 1)}
                    onChange={e => handleInputChange(e, 1)}
                    value={maxValue || ''}
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
                            setMinValue(newValues[0].toString())
                            setMaxValue(newValues[1].toString())
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
