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
                        className='bg-purple-600 py-3 rounded-lg max-w-72 hover:bg-purple-500 transition duration-300 ease-in-out text-lg text-center text-white tracking-wide'>
                        На главную
                    </div>
                </Link>
            </div>
        </>
    )
        ;
};

export default ToMainLink;