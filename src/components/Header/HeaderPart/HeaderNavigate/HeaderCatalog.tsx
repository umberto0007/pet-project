import {FC, useState} from 'react';

import {productsApi} from '#store/dummyJson/products.api';
import CATALOG from '#assets/catalog.svg';
import SkeletonHeaderNav from '#components/Skeleton/SkeletonHeaderNav';
import CatalogMenu from '#components/CatalogMenu/CatalogMenu';
import {Link} from 'react-router-dom';


const HeaderCatalog: FC = () => {
    const {data: categories, isLoading} = productsApi.useGetCatalogMenuQuery('')
    const [catalogMenuActive, setCatalogMenuActive] = useState<boolean>(false)

    const handleClick = () => {
        setCatalogMenuActive(true)
    }


    return (
        <>
            {isLoading
                ?
                <SkeletonHeaderNav/>
                :
                <li onClick={handleClick} className='flex flex-col items-center max-w-16 cursor-pointer'>
                    <img className='w-7 h-7' src={CATALOG} alt='catalog'/>
                    <div className='mt-2 hover:text-purple-700'>Каталог</div>
                </li>
            }
            <CatalogMenu active={catalogMenuActive} setActive={setCatalogMenuActive}>
                <ul className='container px-20 flex flex-wrap py-5 gap-5'>
                    {categories && categories.map(({id, slug, name, icon}) =>
                        <Link to={`/${slug}`}>
                            <li key={id}>
                                <div className='flex items-center text-lg'>
                                    <img src={icon}/>
                                    <div className='p-3 hover:text-purple-700'>{name}</div>
                                </div>
                            </li>
                        </Link>
                    )}
                </ul>
            </CatalogMenu>
        </>
    );
};

export default HeaderCatalog;