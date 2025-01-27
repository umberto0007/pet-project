import React, {useEffect, useState} from 'react';

import {CreateUser} from '#types/entities/user';
import {ChildProps} from '#types/models/product.types';
import {useTypedSelector} from '#hooks/useTypedSelector';
import PROFILE from '#assets/icons/profile.svg'
import UserForm from '#components/Auth/User/UserForm';
import SkeletonHeaderNav from '#components/UI/Skeleton/SkeletonHeaderNav';
import HeaderProfileNoAuth from '#components/UI/Navigation/Header/HeaderNavigate/HeaderProfile/HeaderProfileNoAuth';
import HeaderProfileWithAuth from '#components/UI/Navigation/Header/HeaderNavigate/HeaderProfile/HeaderProfileWithAuth';


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
            {isLoading
                ?
                <SkeletonHeaderNav/>
                :
                (currentUser
                        ?

                        <HeaderProfileWithAuth values={values}/>
                        :

                        <HeaderProfileNoAuth handleClick={handleClick} values={values}/>
                )
            }
            <UserForm active={formActive} setActive={setFormActive}/>
        </>
    );
};
export default HeaderProfile;