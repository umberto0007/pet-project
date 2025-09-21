import React, {useEffect, useState} from 'react';
import Slider from 'react-slider'

import './PriceRangeFilter.css'
import {ChildProps} from '#types/models/product.types';


const PriceRangeFilter: React.FC<ChildProps> = (
    {
        onChange,
        prices
    }
) => {

    const [range, setRange] = useState<[number, number] | null>(null)
    const [inputMin, setInputMin] = useState<string>('')
    const [inputMax, setInputMax] = useState<string>('')

    useEffect(() => {
        if (prices && prices.length > 0) {
            setRange([0, prices.length - 1])
        }
    }, [prices]);


    function aroundNumber(arr: number[], num: number) {
        return arr.reduce((prev, current) => {
            return Math.abs(current - num) < Math.abs(prev - num) ? current : prev
        })
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValue = event.target.value
        if (index === 0 && /^\d*$/.test(newInputValue)) {
            setInputMin(newInputValue)
        }
        if (index === 1 && /^\d*$/.test(newInputValue)) {
            setInputMax(newInputValue)
        }
    }

    const handleBlurInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {

        if (!prices) return

        const newInputValue = Number(event.target.value)
        const aroundNumberRes = aroundNumber(prices, newInputValue)
        const aroundNumberResInd = prices.indexOf(aroundNumberRes)

        let newRange: [number, number] = [range?.[0] ?? 0, range?.[1] ?? prices.length - 1]

        if (index === 0) {
            if (inputMin === '') {
                setInputMin(prices[newRange[0]].toString())
                setInputMax(prices[newRange[1]].toString())
            } else {
                setInputMin(aroundNumberRes.toString())
                setInputMax(prices[newRange[1]].toString())
                newRange = [aroundNumberResInd, newRange[1] ?? aroundNumberResInd]
            }

            if(aroundNumberRes > prices[newRange[1]]) {
                setInputMin(prices[newRange[1]].toString())
                newRange = [newRange[1], newRange[1]]
            }
        }

        if (index === 1) {
            if (inputMax === '') {
                setInputMax(prices[newRange[1]].toString())
                setInputMin(prices[newRange[0]].toString())
            } else {
                setInputMin(prices[newRange[0]].toString())
                setInputMax(aroundNumberRes.toString())
                newRange = [newRange?.[0] ?? aroundNumberResInd, aroundNumberResInd]
            }

            if(aroundNumberRes < prices[newRange[0]] && inputMax !== '') {
                setInputMax(prices[newRange[0]].toString())
                newRange = [newRange[0], newRange[0]]
            }
        }
        
        setRange(newRange)
        onChange?.([prices[newRange[0]], prices[newRange[1]]])
    }

    const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Enter') {
            handleBlurInput({target: event.target} as React.FocusEvent<HTMLInputElement>, index)
        }
    }

    const handleSliderChange = (newRange: [number, number]) => {
        if (!prices) return;
        setInputMin(prices[newRange[0]].toString());
        setInputMax(prices[newRange[1]].toString());
        setRange(newRange);
        onChange?.([prices[newRange[0]], prices[newRange[1]]]);
    };

    return (
        <div className='mb-8'>
            <div className='flex items-center justify-between'>
                <input
                    onChange={(e) => handleInputChange(e, 0)}
                    onBlur={(e) => handleBlurInput(e, 0)}
                    onKeyDown={(e) => handlePressEnter(e, 0)}
                    value={inputMin}
                    placeholder={`от ${prices?.[0] ?? ''}`}
                    autoComplete='off'
                    className='text-lg p-2 w-[7.7rem] h-12 border rounded-s hover:border-purple-400 focus:border-purple-400 transition duration-300'
                />

                <input
                    onChange={(e) => handleInputChange(e, 1)}
                    onBlur={(e) => handleBlurInput(e, 1)}
                    onKeyDown={(e) => handlePressEnter(e, 1)}
                    value={inputMax}
                    placeholder={`до ${prices?.[prices.length - 1] ?? ''}`}
                    autoComplete='off'
                    className='text-lg p-2 w-[7.7rem] h-12 border rounded-s focus:border-purple-400 hover:border-purple-400 transition duration-300'/>
            </div>
            <div className='w-full mt-10'>
                <Slider
                    className='slider'
                    onChange={handleSliderChange}
                    value={range as [number, number]}
                    min={0}
                    max={prices && prices.length - 1}
                />
            </div>
        </div>
    )
};

export default PriceRangeFilter;














