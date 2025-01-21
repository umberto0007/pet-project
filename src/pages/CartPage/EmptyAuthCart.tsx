import React from 'react';

import UserForm from '#components/Auth/User/UserForm';
import {FormsProps} from '#types/entities/formsProps';

const EmptyAuthCart: React.FC<FormsProps> = ({handleClick, active, setActive}) => {
    return (
        <>
            <p className='mt-6 text-lg tracking-wide'>Чтобы наполнить корзину авторизируйтесь</p>
            <div className='mt-10'>
                <button onClick={handleClick}
                        className='min-w-52 bg-blue-100 p-5 tracking-wide text-lg rounded-lg hover:bg-blue-200 transition-[0.4s] duration-[all]'>Авторизоваться
                </button>
            </div>
            <UserForm active={active} setActive={setActive}/>
        </>
    );
};

export default EmptyAuthCart;