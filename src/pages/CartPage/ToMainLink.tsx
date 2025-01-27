import React from 'react';
import {Link} from 'react-router-dom';

import {ROUTES} from '#utils/routes';

const ToMainLink = () => {
    return (
        <>
            <p className='mt-6 text-lg tracking-wide'>Акции, специальные предложения и обзоры на главной
                странице<br/> помогут вам найти подходящие товары</p>
            <div className='mt-10'>
                <Link title='На главную' to={ROUTES.HOME}>
                    <div
                        className='bg-blue-100 py-3 rounded-lg mt-10 max-w-72 hover:bg-blue-200 transition-[0.4s] duration-[all] text-lg text-center tracking-wide'>
                        На главную
                    </div>
                </Link>
            </div>
        </>
    )
        ;
};

export default ToMainLink;