import {useState} from 'react';
import {Link} from 'react-router-dom';

import {productsSliceApi} from '#redux/api/productsSlice.api';
import {ReactComponent as CATALOG} from '#assets/icons/catalog.svg';
import SkeletonHeaderNav from '#components/Skeleton/SkeletonHeaderNav';
import CatalogMenu from '#components/CatalogMenu/CatalogMenu';


const HeaderCatalog = () => {
    const {data: categories, isLoading} = productsSliceApi.useGetCatalogMenuQuery('')
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
                    className='w-20 flex flex-col items-center cursor-pointer py-2 hover:bg-grey-hov rounded-xl'>
                    <CATALOG className='w-8 h-8 mb-2'/>
                    <div className='tracking-wide'>Каталог</div>
                </li>
            }

            <CatalogMenu active={catalogMenuActive} setActive={setCatalogMenuActive}>
                <ul className='container px-20 flex flex-wrap py-5 gap-5'>
                    {categories && categories.map(({id, slug, name, icon}) =>
                        <Link to={`/${slug}`} key={id}>
                            <li>
                                <div className='flex items-center text-lg'>
                                    <img src={icon} alt='icon'/>
                                    <div
                                        className='p-3 hover:text-purple-700 transition-[0.4s] duration-[all] tracking-wide'>{name}</div>
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