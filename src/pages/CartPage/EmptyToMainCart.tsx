import React from 'react';
import {Link} from 'react-router-dom';

import {ROUTES} from '#utils/routes';

const EmptyToMainCart = () => {
    return (
        <>
            <p className='mt-6 text-lg tracking-wide'>Акции, специальные предложения и обзоры на главной
                странице<br/> помогут вам найти подходящие товары</p>
            <div className='mt-10'>
                <Link to={ROUTES.HOME}>
                    <button
                        className='min-w-52 bg-blue-100 p-5 tracking-wide text-lg rounded-lg hover:bg-blue-200 transition-[0.4s] duration-[all]'>На
                        главную
                    </button>
                </Link>
            </div>
        </>
    );
};

export default EmptyToMainCart;