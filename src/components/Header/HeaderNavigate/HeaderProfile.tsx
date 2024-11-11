import React, {useState} from 'react';

import {ReactComponent as PROFILE} from '#assets/icons/profile.svg'
import SkeletonHeaderNav from '#components/Skeleton/SkeletonHeaderNav';
import {ChildProps} from '#models/product.types';
import UserForm from '#components/User/UserForm';


const HeaderProfile: React.FC<ChildProps> = ({isLoading}) => {

    const [formActive, setFormActive] = useState<boolean>(false)

    const handleClick = () => {
        setFormActive(true)
    }



    return (
        <>
            {isLoading
                ?
                <SkeletonHeaderNav/>
                :
                <li onClick={handleClick} className='flex flex-col items-center p-2 hover:bg-grey-hov rounded-xl cursor-pointer'>
                    <PROFILE/>
                    <div className='mt-2 tracking-wide'>Войти</div>
                </li>
            }
            <UserForm active={formActive} setActive={setFormActive}/>
        </>
    );
};

export default HeaderProfile;