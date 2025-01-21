import React, {useEffect, useState} from 'react';

import {FormsProps} from '#types/entities/formsProps';
import {authSliceApi} from '#redux/api/authSlice.api';
import {CreateUser} from '#types/entities/user';
import {Target} from '#types/entities/target';
import {LOGIN} from '#utils/constants';
import SignupSuccessMessage from '#components/Auth/authMessage/SignupSuccessMessage';


const UserSignupForm = ({active, setActive = () => {}, toggleCurrentFormType = () => {}}: FormsProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [createUser, {isSuccess}] = authSliceApi.useCreateUserMutation()
    const [values, setValues] = useState<CreateUser>({
        name: '',
        email: '',
        password: '',
        avatar: ''
    })

    useEffect(() => {
        if (isSuccess) {
            setIsVisible(!isVisible); // Показываем сообщение о регистрации
        }
    }, [isSuccess]);


    const handleChange = ({target: {value, name}}: Target) => {
        setValues({...values, [name]: value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await createUser(values).unwrap();
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error)
        }
        setActive(false)
        setValues({
            name: '',
            email: '',
            password: '',
            avatar: ''
        })
    }
    return (
        <>
            <div
                className={`${active ? 'active [&.active]: opacity-100  pointer-events: all' : 'opacity-0 pointer-events-none'} z-50 h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex items-center justify-center transition-[0.5s] left-0 top-0`}
                onClick={() =>  setActive(false)}>
                <div
                    className={`${active ? 'active [&.active]: scale-100' : 'scale-50'} bg-[white] transition-[0.4s] duration-[all] w-[25vw] p-10 rounded-2xl`}
                    onClick={e => e.stopPropagation()}>
                    <h2 className='text-3xl font-bold text-gray-800 tracking-wide mb-7'>Регистрация</h2>
                    <div onClick={() => setActive(false)}
                         className='absolute z-[9] cursor-pointer right-4 top-4 *:w-7 h-7 stroke-gray-300'>
                        <svg className='w-[25px] h-[25px] *:w-full h-full'>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}/>
                        </svg>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-y-5'>
                        <div>
                            <input
                                className='w-full p-4 text-xl border-2 rounded-lg focus:outline-none focus:border-blue-200'
                                placeholder='e-mail'
                                name='email'
                                value={values.email}
                                type='email'
                                autoComplete='off'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                className='w-full p-4 text-xl border-2 rounded-lg focus:outline-none focus:border-blue-200'
                                placeholder='name'
                                name='name'
                                value={values.name}
                                autoComplete='off'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                className='w-full p-4 text-xl border-2 rounded-lg focus:outline-none focus:border-blue-200'
                                placeholder='password'
                                name='password'
                                value={values.password}
                                type='password'
                                autoComplete='off'
                                onChange={handleChange}
                                pattern='\d{4,}'
                                title='Пароль должен содержать только цифры, минимум 4'
                                required
                            />
                        </div>
                        <div>
                            <input
                                className='w-full p-4 text-xl border-2 rounded-lg focus:outline-none focus:border-blue-200'
                                placeholder='your avatar'
                                name='avatar'
                                value={values.avatar}
                                autoComplete='off'
                                onChange={handleChange}
                                pattern='https?://.+?'
                                title='Введите корректный URL, начиная с http:// или https://'
                                required
                            />
                        </div>
                        <div className='text-purple-800 hover:text-purple-600 cursor-pointer'
                             onClick={() => toggleCurrentFormType(LOGIN)}>У меня уже есть
                            аккаунт
                        </div>
                        <button
                            className='bg-blue-100 w-[16vw] py-4 m-auto rounded-lg hover:bg-blue-200 transition-[0.4s] duration-[all] font-bold tracking-wide text-lg text-gray-600'
                            type='submit'>
                            Зарегистрироваться
                        </button>
                    </form>
                </div>
            </div>
            <SignupSuccessMessage active={isVisible} setActive={setIsVisible}/>
        </>
    );
};


export default UserSignupForm;