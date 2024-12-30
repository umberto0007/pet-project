import React from 'react';

import {FormsProps} from '#types/entities/formsProps';
import {CreateUser} from '#types/entities/user';

const HeaderProfileNoAuth = ({handleClick, values = {} as CreateUser}: FormsProps) => {
    return (
        <li
            onClick={handleClick}
            className='w-20 flex flex-col items-center cursor-pointer py-2 hover:bg-grey-hov rounded-xl'
        >
            <div
                className="w-8 h-8 bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage: `url(${values.avatar})`,
                }}
            />
            <div className="mt-2 tracking-wide">{values.name}</div>
        </li>
    );
};

export default HeaderProfileNoAuth;