import React, {useLayoutEffect, useRef, useState} from 'react';

import Slider from 'react-slider'

import {FilterProps} from '#types/models/product.types';
import {CATEGORY_FILTERS} from "#utils/constants";
import ShowProductsButton from "#components/UI/Button/ShowProductsButton";


const PriceRangeFilter: React.FC<FilterProps> = (
    {
        dispatch,
        filterPrices,
        filteredProducts,
        applyButtonFilter,
        setApplyButtonFilter,
    }
) => {

    const [range, setRange] = useState<[number, number] | null>(null)
    const [inputMin, setInputMin] = useState<string>('')
    const [inputMax, setInputMax] = useState<string>('')

    // Создаем ref для мгновенной фиксации состояния range при вычислениях
    const rangeRef = useRef<[number, number] | null>(null);
    // Создаем ref и помещаем в него массив min и max цен, введенных пользователем
    const selectedPricesRef = useRef<[number, number] | null>(null)


    // Создаем переменную для случая, когда длина массива цен равна 1, чтобы визуально отобразить max(максимальную величину) react-slider
    // равную 1. Ключевой момент!!! min и max слайдера не привязаны к индексу элемента массива, только по условию,
    // поэтому при наличии даже одного элемента в массиве, устанавливаем max = 1 и разводим ползунки.

    const sliderMax = filterPrices && (filterPrices.length <= 1 ? 1 : filterPrices.length - 1)


    // Используем useLayoutEffect для вывода на экран конечного значения range и избежания скачков
    // ползунка max. useLayoutEffect срабатывает перед paint.
    // При использовании useEffect значение range выводится после отрисовки, поэтому имея промежуточные
    // значения range видим прыжки max ползунка. useEffect срабатывает после paint.


    useLayoutEffect(() => {

        // Заносим в переменную пользовательские цены
        const selectedPrices = selectedPricesRef.current

        if (!filterPrices || filterPrices.length === 0 || !filteredProducts || filteredProducts.length === 0) {
            setInputMin('')
            setInputMax('')
            // Если товаров нет, разводим ползунки визуально,
            // даже если цена одна, чтобы слайдер не выглядел сломанным.
            setRange([0, sliderMax as number]);
            rangeRef.current = [0, 0];
            selectedPricesRef.current = null

            return;
        }

        if (!selectedPrices) {
            setInputMin('')
            setInputMax('')
            // Если товар один, показываем оба ползунка в начале,
            // так как фактически доступна только одна цена.
            setRange([0, filterPrices.length - 1])
            rangeRef.current = [0, filterPrices.length - 1]

            return;
        }

        // Случай когда воспользовались ценовым фильтром, соответсвенно установили цены
        // min и max selectedPrices
        if (selectedPrices) {

            // Ищем ближайшие цены в новом отфильтрованном массиве
            let priceIndMinAfterFilters = filterPrices.findIndex(price => price >= selectedPrices[0])
            if (priceIndMinAfterFilters === -1) priceIndMinAfterFilters = 0;

            let reverseInd = filterPrices.slice().reverse().findIndex(price => price <= selectedPrices[1])

            let priceIndMaxAfterFilters

            if (reverseInd === -1) {
                priceIndMaxAfterFilters = filterPrices.length - 1;
            } else {
                priceIndMaxAfterFilters = filterPrices.length - 1 - reverseInd
            }

            let rangeAfterFilters: [number, number] = [priceIndMinAfterFilters, priceIndMaxAfterFilters]

            setRange(rangeAfterFilters);
            rangeRef.current = rangeAfterFilters;

            console.log([filterPrices[priceIndMinAfterFilters], filterPrices[priceIndMaxAfterFilters]]);

        }

    }, [filterPrices, filteredProducts]);


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

        // Передаем в userPricesRef пользовательские min и max цены
        selectedPricesRef.current = [filterPrices[newRange[0]], filterPrices[newRange[1]]]

        rangeRef.current = newRange

        setRange(newRange)

        handlePriceChange?.([filterPrices[newRange[0]], filterPrices[newRange[1]]])

        setApplyButtonFilter?.(CATEGORY_FILTERS.PRICE)

    }


    const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Enter') {
            handleBlurInput({target: event.target} as React.FocusEvent<HTMLInputElement>, index)
        }
    }

    const handleSliderChange = (newRange: [number, number]) => {
        if (!filterPrices || filterPrices.length === 0 || filterPrices.length <= 1) return;

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


        // Передаем в userPricesRef пользовательские min и max цены
        selectedPricesRef.current = [filterPrices[rangeAfterUseSlider[0]], filterPrices[rangeAfterUseSlider[1]]]


        rangeRef.current = rangeAfterUseSlider
        setRange(rangeAfterUseSlider);

        handlePriceChange?.([filterPrices[rangeAfterUseSlider[0]], filterPrices[rangeAfterUseSlider[1]]]);

        setApplyButtonFilter?.(CATEGORY_FILTERS.PRICE)
    }

    return (
        <div className='mb-8'>
            <div className='flex items-center justify-between relative'>
                <input
                    onChange={(e) => handleInputChange(e, 0)}
                    onBlur={(e) => handleBlurInput(e, 0)}
                    onKeyDown={(e) => handlePressEnter(e, 0)}
                    value={inputMin}
                    placeholder={filterPrices?.length === 0 || filteredProducts?.length === 0 ? '—' : `от ${filterPrices?.[0] ?? ''}`}
                    autoComplete='off'
                    className={`text-lg p-2 w-[7.7rem] h-12 border rounded-s hover:border-purple-400 focus:border-purple-400 transition duration-300 ${filterPrices?.length === 0 || filteredProducts?.length === 0 ? 'placeholder:text-center' : ''}`}
                    disabled={filterPrices?.length === 0 || filteredProducts?.length === 0}
                />

                <input
                    onChange={(e) => handleInputChange(e, 1)}
                    onBlur={(e) => handleBlurInput(e, 1)}
                    onKeyDown={(e) => handlePressEnter(e, 1)}
                    value={inputMax}
                    placeholder={filterPrices?.length === 0 || filteredProducts?.length === 0 ? '—' : `до ${filterPrices?.[filterPrices?.length - 1] ?? ''}`}
                    autoComplete='off'
                    className={`text-lg p-2 w-[7.7rem] h-12 border rounded-s hover:border-purple-400 focus:border-purple-400 transition duration-300 ${filterPrices?.length === 0 || filteredProducts?.length === 0 ? 'placeholder:text-center' : ''}`}
                    disabled={filterPrices?.length === 0 || filteredProducts?.length === 0}
                />
                {applyButtonFilter === CATEGORY_FILTERS.PRICE && (
                    <ShowProductsButton/>
                )}
            </div>
            <div className='w-full mt-10'>
                <Slider
                    className='w-full h-[2px] bg-gray-300 cursor-pointer'
                    thumbClassName='w-6 h-6 cursor-pointer bg-white rounded-full border-2 border-purple-500 -mt-3'
                    trackClassName='h-full bg-purple-500 cursor-pointer'
                    onChange={handleSliderChange}
                    value={range as [number, number]}
                    min={0}
                    max={sliderMax}
                    disabled={!filterPrices || filterPrices.length === 0 || !filteredProducts || filteredProducts.length === 0 || filterPrices?.length === 1}
                />
            </div>
        </div>
    )
}

export default PriceRangeFilter;














