import React from 'react';
import {Link, useLocation} from 'react-router-dom';

import {v4 as uuidv4} from 'uuid';


const BreadCrumbs = () => {
    const {pathname} = useLocation()
    const pathNames = pathname.split('/').filter((el) => el)

    let breadCrumbPath = ''


    return (
        pathNames[0] === 'cart' || pathNames[0] === 'profile'
            ?
            null
            :
            <div className='mt-14'>
                {pathNames.length > 0 && <Link className='text-gray-500 hover:text-gray-700' to='/'>{'Главная '}</Link>}
                {pathNames.map((name, index) => {
                    breadCrumbPath += `/${name}`

                    const isLast = index === pathNames.length - 1
                    return isLast ? (
                        <span className='text-gray-500 hover:text-gray-700'
                              key={uuidv4()}> / {name.length > 3 ? name : 'Карточка товара'}</span>
                    ) : (
                        <span className='text-gray-500 hover:text-gray-700' key={uuidv4()}>
                        / <Link to={breadCrumbPath}>{name}</Link>
                    </span>
                    )
                })}
            </div>
    );
};

export default BreadCrumbs;