import React, {useEffect, useRef, useState} from 'react';

import Slider from 'react-slider'

import {FilterProps} from '#types/models/product.types';


const PriceRangeFilter: React.FC<FilterProps> = (
    {
        dispatch,
        filterPrices,
        changeProducts
    }
) => {

    const [range, setRange] = useState<[number, number] | null>(null)
    // Создаем ref для мгновенной фиксации состояния range при вычислениях
    const rangeRef = useRef<[number, number] | null>(null);
    const [inputMin, setInputMin] = useState<string>('')
    const [inputMax, setInputMax] = useState<string>('')
    // Создаем ref флаг сигнализирующий об использовании слайдера или ввода в инпуты цен
    const changeHandlePricesRef = useRef<boolean>(false)
    // Создаем ref и помещаем в него массив цен до фильтрации
    const filterPricesBeforeFiltersRef = useRef<number[]>([])
    // Флаг на использование слайдера
    const useSliderRef = useRef<boolean>(false)

    console.log(filterPrices)

    useEffect(() => {

        if (!filterPrices || filterPrices.length === 0) return;


        if (!changeHandlePricesRef.current) {
            setInputMin('')
            setInputMax('')
            setRange([0, filterPrices.length - 1])
        }

        // Цены приходящего массива
        const actualPriceMin = filterPrices[0];
        const actualPriceMax = filterPrices[filterPrices.length - 1];

        if (!useSliderRef.current && changeProducts) {
            setRange([0, filterPrices.length - 1])
            handlePriceChange([actualPriceMin, actualPriceMax])
            return;
        }

        // Случай когда массив цен изменили в ручную, а затем отфильтровали -
        // цель, перенести указанный пользователем диапазон цен на актуальный отфильтрованный массив
        if (changeHandlePricesRef.current && changeProducts) {

            // передаем в ref массив цен до применения фильтров
            const filterPricesBeforeFilters = filterPricesBeforeFiltersRef.current

            // передаем в ref диапазон индексов до применения фильтров
            let rangeBeforeFilters: [number, number] = rangeRef.current ?? [range?.[0] ?? 0, range?.[1] ?? (filterPricesBeforeFilters.length - 1)]

            // обрезаем индексы после использования слайдера или ввода в инпуты в массиве до фильтрации
            rangeBeforeFilters = [
                Math.min(rangeBeforeFilters[0], filterPricesBeforeFilters.length - 1),
                Math.min(rangeBeforeFilters[1], filterPricesBeforeFilters.length - 1)
            ]

            console.log(filterPricesBeforeFilters)

            // формируем цены до применения фильтров
            const priceMinBeforeFilters = filterPricesBeforeFilters[rangeBeforeFilters[0]]
            const priceMaxBeforeFilters = filterPricesBeforeFilters[rangeBeforeFilters[1]]

            // ищем индексы цен до фильтрации в массиве цен после фильтрации этого массива
            let priceIndMinAfterFilters = filterPrices.findIndex(price => price >= priceMinBeforeFilters)
            if (priceIndMinAfterFilters === -1) priceIndMinAfterFilters = 0;

            let reverseInd = filterPrices.slice().reverse().findIndex(price => price <= priceMaxBeforeFilters)

            let priceIndMaxAfterFilters

            if (reverseInd === -1) {
                priceIndMaxAfterFilters = filterPrices.length - 1;
            } else {
                priceIndMaxAfterFilters = filterPrices.length - 1 - reverseInd
            }

            // формируем цены и range после фильтрации
            const priceMinAfterFilters = filterPrices[priceIndMinAfterFilters]
            const priceMaxAfterFilters = filterPrices[priceIndMaxAfterFilters]

            let rangeAfterFilters: [number, number] = [priceIndMinAfterFilters, priceIndMaxAfterFilters]

            setRange(rangeAfterFilters);
            rangeRef.current = rangeAfterFilters;
            handlePriceChange?.([priceMinAfterFilters, priceMaxAfterFilters]);

            return;
        }

    }, [filterPrices?.length, changeProducts]);

    useEffect(() => {
        if (!changeProducts) {
            useSliderRef.current = false;
        }
    }, [changeProducts]);


    const handlePriceChange = (newPriceRange: [number, number]) => {
        dispatch({type: 'PRICE_RANGE', payload: newPriceRange})
    }

    //Функция округления цен до имеющихся в массиве
    function aroundNumber(arr: number[], num: number) {
        if (!arr || arr.length === 0) return num;
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

        if (!filterPrices || filterPrices.length === 0) return;

        const newInputValue = Number(event.target.value)

        const aroundNumberRes = aroundNumber(filterPrices, newInputValue)
        const aroundNumberResInd = filterPrices.indexOf(aroundNumberRes)

        let newRange: [number, number] = [range?.[0] ?? 0, range?.[1] ?? filterPrices.length - 1]


        newRange = [
            Math.max(0, Math.min(newRange[0], filterPrices.length - 1)),
            Math.max(0, Math.min(newRange[1], filterPrices.length - 1)),
        ];


        let userInputValueMin = newInputValue >= filterPrices[0] ? newInputValue : filterPrices[0]
        let userInputValueMax = newInputValue <= filterPrices[filterPrices.length - 1] ? newInputValue : filterPrices[filterPrices.length - 1]

        if (index === 0) {

            if (inputMin === '') {
                setInputMin(filterPrices[newRange[0]].toString())
                setInputMax(filterPrices[newRange[1]].toString())
            }

            setInputMin(userInputValueMin.toString())
            newRange = [aroundNumberResInd, newRange[1]]


            if (userInputValueMin > filterPrices[newRange[1]]) {
                setInputMin(inputMax)
                newRange = [newRange[1], newRange[1]]
            }

        }


        if (index === 1) {

            if (inputMax === '') {
                setInputMax(filterPrices[newRange[1]].toString())
                setInputMin(filterPrices[newRange[0]].toString())
            }

            setInputMax(userInputValueMax.toString())
            newRange = [newRange?.[0], aroundNumberResInd]


            if (userInputValueMax < filterPrices[newRange[0]]) {
                setInputMax(inputMin)
                newRange = [newRange[0], newRange[0]]
            }

        }

        changeHandlePricesRef.current = true

        // Передаем в ref копию массива цен для работы с ним как с массивом до фильтрации
        filterPricesBeforeFiltersRef.current = [...filterPrices];

        rangeRef.current = newRange

        setRange(newRange)
        handlePriceChange?.([filterPrices[newRange[0]], filterPrices[newRange[1]]])
    }


    const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Enter') {
            handleBlurInput({target: event.target} as React.FocusEvent<HTMLInputElement>, index)
        }
    }

    const handleSliderChange = (newRange: [number, number]) => {
        if (!filterPrices || filterPrices.length === 0) return;

        const rangeBeforeUseSlider = rangeRef.current ?? newRange

        const rangeAfterUseSlider: [number, number] = [
            Math.min(newRange[0], filterPrices.length - 1),
            Math.min(newRange[1], filterPrices.length - 1)
        ]

        const minChangeInd = rangeBeforeUseSlider[0] !== rangeAfterUseSlider[0]
        const maxChangeInd = rangeBeforeUseSlider[1] !== rangeAfterUseSlider[1]

        // Определяем, какой thumb был сдвинут (min / max).
        // react-slider при любом onChange нормализует value (min <= max),
        // пересчитывая оба индекса и создавая новый массив.
        // Из-за этого при сдвиге min может измениться и max по ссылке,
        // хотя пользователь его не трогал.
        // Фильтруем это поведение, чтобы обновлять только активный инпут.

        const minMoved = minChangeInd &&
            (
                !maxChangeInd ||
                rangeAfterUseSlider[0] === rangeAfterUseSlider[1] // при схлопывании диапазона
            )

        const maxMoved = maxChangeInd && !minChangeInd


        // если индексы не равны, показываем реальную цену, в противном случае оставляем введенную
        // пользователем

        if (minMoved) {
            setInputMin(filterPrices[rangeAfterUseSlider[0]].toString());
        }

        if (maxMoved) {
            setInputMax(filterPrices[rangeAfterUseSlider[1]].toString());
        }

        useSliderRef.current = true
        changeHandlePricesRef.current = true

        // Передаем в ref копию массива цен для работы с ним как с массивом до фильтрации
        filterPricesBeforeFiltersRef.current = [...filterPrices];


        rangeRef.current = rangeAfterUseSlider
        setRange(rangeAfterUseSlider);

        handlePriceChange?.([filterPrices[rangeAfterUseSlider[0]], filterPrices[rangeAfterUseSlider[1]]]);

    }


    return (
        <div className='mb-8'>
            <div className='flex items-center justify-between'>
                <input
                    onChange={(e) => handleInputChange(e, 0)}
                    onBlur={(e) => handleBlurInput(e, 0)}
                    onKeyDown={(e) => handlePressEnter(e, 0)}
                    value={inputMin}
                    placeholder={filterPrices?.length === 0 ? '—' : `от ${filterPrices?.[0] ?? ''}`}
                    autoComplete='off'
                    className={`text-lg p-2 w-[7.7rem] h-12 border rounded-s hover:border-purple-400 focus:border-purple-400 transition duration-300 ${filterPrices?.length === 0 ? 'placeholder:text-center' : ''}`}
                />

                <input
                    onChange={(e) => handleInputChange(e, 1)}
                    onBlur={(e) => handleBlurInput(e, 1)}
                    onKeyDown={(e) => handlePressEnter(e, 1)}
                    value={inputMax}
                    placeholder={filterPrices?.length === 0 ? '—' : `до ${filterPrices?.[filterPrices?.length - 1] ?? ''}`}
                    autoComplete='off'
                    className={`text-lg p-2 w-[7.7rem] h-12 border rounded-s hover:border-purple-400 focus:border-purple-400 transition duration-300 ${filterPrices?.length === 0 ? 'placeholder:text-center' : ''}`}/>
            </div>
            <div className='w-full mt-10'>
                <Slider
                    className='w-full h-[2px] bg-gray-300 cursor-pointer'
                    thumbClassName='w-6 h-6 cursor-pointer bg-white rounded-full border-2 border-purple-500 -mt-3'
                    trackClassName='h-full bg-purple-500 cursor-pointer'
                    onChange={handleSliderChange}
                    value={range as [number, number]}
                    min={0}
                    max={filterPrices && filterPrices.length - 1}
                    disabled={!filterPrices || filterPrices.length === 0}
                />
            </div>
        </div>
    )
}

export default PriceRangeFilter;














