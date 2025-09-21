import {Link} from 'react-router-dom';

import {ROUTES} from '#utils/routes';
import {strLength} from '#utils/common';
import {FormsProps} from '#types/entities/formsProps';
import {CreateUser} from '#types/entities/user';

const HeaderProfileWithAuth = ({values = {} as CreateUser}: FormsProps) => {
    return (
        <Link to={ROUTES.PROFILE}>
            <li
                className='w-20 flex flex-col items-center cursor-pointer py-2 hover:bg-grey-hov rounded-xl'
            >
                <div
                    className='w-8 h-8 bg-no-repeat bg-cover bg-center rounded-full'
                    style={{
                        backgroundImage: `url(${values.avatar})`,
                    }}
                />
                <div className='mt-2 tracking-wide break-all'>{strLength(values.name, 6)}</div>
            </li>
        </Link>
    );
};

export default HeaderProfileWithAuth;