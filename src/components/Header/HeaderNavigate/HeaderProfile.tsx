import React, {useEffect, useState} from 'react';

import {CreateUser} from '#types/entities/user';
import {ChildProps} from '#types/models/product.types';
import {useTypedSelector} from '#hooks/useTypedSelector';
import PROFILE from '#assets/icons/profile.svg'
import UserForm from '#components/User/UserForm';
import SkeletonHeaderNav from '#components/Skeleton/SkeletonHeaderNav';


const HeaderProfile: React.FC<ChildProps> = ({isLoading}) => {
    const [formActive, setFormActive] = useState<boolean>(false);
    const [values, setValues] = useState<CreateUser>({
        name: 'Войти',
        avatar: PROFILE,
    });

    const {currentUser} = useTypedSelector(({user}) => user)

    useEffect(() => {
        if (!currentUser || typeof currentUser !== 'object') return;
        if ('name' in currentUser && 'avatar' in currentUser) {
            setValues({...currentUser});
        }
    }, [currentUser]);


    const handleClick = () => {
        setFormActive(true);
    };


    return (
        <>
            {isLoading ? (
                <SkeletonHeaderNav/>
            ) : (
                <li
                    onClick={handleClick}
                    className="flex flex-col items-center p-2 hover:bg-grey-hov rounded-xl cursor-pointer"
                >
                    <div
                        className="w-8 h-8 bg-no-repeat bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${values.avatar})`,
                        }}
                    />
                    <div className="mt-2 tracking-wide">{values.name}</div>
                </li>
            )}
            <UserForm active={formActive} setActive={setFormActive}/>
        </>
    );
};
export default HeaderProfile;