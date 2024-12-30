import {useDispatch} from 'react-redux';

import {FormsProps} from '#types/entities/formsProps';
import {useTypedSelector} from '#hooks/useTypedSelector';
import {toggleFormType} from '#redux/features/user/userSlice';
import UserSignupForm from '#components/auth/User/UserSignupForm';
import UserLoginForm from '#components/auth/User/UserLoginForm';


const UserForm = ({active, setActive}: FormsProps) => {
    const dispatch = useDispatch()
    const toggleCurrentFormType = (type: string) => dispatch(toggleFormType(type))
    const {formType} = useTypedSelector(({user}) => user)


    return (
        <>
            {formType === 'signup'
                ?
                <UserSignupForm
                    active={active}
                    setActive={setActive}
                    toggleCurrentFormType={toggleCurrentFormType}/>
                :
                <UserLoginForm
                    active={active}
                    setActive={setActive}
                    toggleCurrentFormType={toggleCurrentFormType}/>
            }
        </>
    );
};

export default UserForm;