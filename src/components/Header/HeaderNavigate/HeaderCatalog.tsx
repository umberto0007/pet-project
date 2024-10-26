import {useState} from 'react';
import {Link} from 'react-router-dom';

import {productsApi} from '#store/dummyJson/products.api';
import {ReactComponent as CATALOG} from '#assets/catalog.svg';
import SkeletonHeaderNav from '#components/Skeleton/SkeletonHeaderNav';
import CatalogMenu from '#components/CatalogMenu/CatalogMenu';


const HeaderCatalog = () => {
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
                <li onClick={handleClick}
                    className='flex flex-col items-center cursor-pointer p-2 hover:bg-grey-hov rounded-xl'>
                    <CATALOG/>
                    <div className='mt-3'>Каталог</div>
                </li>
            }

            <CatalogMenu active={catalogMenuActive} setActive={setCatalogMenuActive}>
                <ul className='container px-20 flex flex-wrap py-5 gap-5'>
                    {categories && categories.map(({id, slug, name, icon}) =>
                        <Link to={`/${slug}`} key={id}>
                            <li>
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