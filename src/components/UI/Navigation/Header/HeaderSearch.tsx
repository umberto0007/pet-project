import {useState} from 'react';

import {Link} from 'react-router-dom';

import {productsSliceApi} from '#redux/api/productsSlice.api';
import {Target} from '#types/entities/target';
import {urlImg} from '#utils/common';
import stub from '#assets/stub/stub.webp';

const HeaderSearch = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const {data: searchProduct, isLoading} = productsSliceApi.useGetSearchProductsQuery(searchValue)

    const handleSearch = ({target: {value}}: Target) => {
        setSearchValue(value)
    }

    return (
        <form className='flex items-center bg-light-grey-search w-3/5 h-10 rounded-lg relative'>
            <div className='w-4 h-4 m-3 shrink-0'>
                <svg className='w-full h-full fill-grey'>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}/>
                </svg>
            </div>
            <input className='w-full mr-2 bg-light-grey-search outline-0 placeholder-grey tracking-wide'
                   type='search'
                   name='search'
                   placeholder='Поиск'
                   autoComplete='off'
                   onChange={handleSearch}
                   value={searchValue}
            />

            {searchValue && (
                <div
                    className='z-10 w-full top-[120%] left-0 max-h-80 overflow-y-auto scrollbar-hide flex flex-col rounded-lg bg-white shadow-md absolute'>
                    {isLoading
                        ? 'Loading...'
                        :
                        searchProduct && !searchProduct.length
                            ? <div className='p-3'>Нет результатов</div>
                            : searchProduct && searchProduct.map(({title, images, category,id}) => {
                            return (
                                <div className='py-2' key={id}>
                                    <Link
                                         to={`/${category}/${id}`}
                                        onClick={() => setSearchValue('')}
                                        className='text-sm flex items-center py-1 gap-x-4 hover:bg-gray-100 transition-[0.4s] duration-[all]'
                                    >
                                        <div
                                            className='bg-center bg-no-repeat bg-contain rounded-md h-16 w-16'
                                            style={{backgroundImage: images && images.length > 0 ? urlImg(`url(${images?.[0]})`) : (`url(${stub})`)}}
                                        />
                                        <div className='text-base'>{title}</div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            )}
        </form>
    );
};

export default HeaderSearch;