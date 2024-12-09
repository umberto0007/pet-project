import React, {useState} from 'react';

import {authSliceApi} from '#redux/api/authSlice.api';
import {LoginUser} from '#types/entities/user';
import {Target} from '#types/entities/target';
import {FormsProps} from '#types/entities/formsProps';
import {SIGNUP} from '#utils/constants';


const UserLoginForm = ({active, setActive, toggleCurrentFormType}: FormsProps) => {
    const [loginUser, {}] = authSliceApi.useLoginUserMutation()
    const [values, setValues] = useState<LoginUser>({
        email: '',
        password: ''
    })

    const handleChange = ({target: {value, name}}: Target) => {
        setValues({...values, [name]: value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await loginUser(values).unwrap()
            setActive(false)
            setValues({
                email: '',
                password: ''
            })
        } catch (error) {
            setActive(true)
            alert('Ошибка при входе: неверные почта или пароль')
            console.error('Ошибка при создании пользователя:', error)
        }
    }


    return (
        <div
            className={`${active ? 'active [&.active]: opacity-100  pointer-events: all' : 'opacity-0 pointer-events-none'} z-50 h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex items-center justify-center transition-[0.5s] left-0 top-0`}
            onClick={() => setActive(false)}>
            <div
                className={`${active ? 'active [&.active]: scale-100' : 'scale-50'} bg-[white] transition-[0.4s] duration-[all] w-[25vw] p-10 rounded-2xl`}
                onClick={e => e.stopPropagation()}>
                <h2 className='text-3xl font-bold text-gray-800 tracking-wide mb-7'>Вход</h2>
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
                            placeholder='email'
                            name='email'
                            value={values.email}
                            type='email'
                            autoComplete='off'
                            onChange={handleChange}
                            title='Ваша почта'
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
                            title='Ваш пароль'
                            required
                        />
                    </div>
                    <div className='text-purple-800 hover:text-purple-600 cursor-pointer'
                         onClick={() => toggleCurrentFormType && toggleCurrentFormType(SIGNUP)}>Создать аккаунт
                    </div>
                    <button
                        className='bg-blue-100 w-[16vw] py-4 m-auto rounded-lg hover:bg-blue-200 transition-[0.4s] duration-[all] font-bold tracking-wide text-lg text-gray-600'
                        type='submit'>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};


export default UserLoginForm;