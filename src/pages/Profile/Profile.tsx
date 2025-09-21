import React, {useEffect, useState} from 'react';

import {useTypedSelector} from '#hooks/useTypedSelector';
import {CreateUser} from '#types/entities/user';
import {Target} from '#types/entities/target';
import {authSliceApi} from '#redux/api/authSlice.api';


const Profile = () => {
    const [updateUser] = authSliceApi.useUpdateUserMutation()
    const {currentUser} = useTypedSelector(({user}) => user)
    const [values, setValues] = useState<CreateUser>({
        name: '',
        email: '',
        password: '',
        avatar: ''
    })

    useEffect(() => {
        if (!currentUser || typeof currentUser !== 'object') return;
        if ('name' in currentUser && 'avatar' in currentUser && 'email' in currentUser && 'password' in currentUser) {
            setValues({...currentUser});
        }
    }, [currentUser]);



    const handleChange = ({target: {value, name}}: Target) => {
        setValues({...values, [name]: value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await updateUser(values)
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error)
        }
    }



    return (
        <div className='mt-24'>
            <h1 className='font-bold text-4xl text-grey tracking-wide'>Ваш профиль</h1>
            <div
                className='mt-8 w-32 h-32 bg-no-repeat bg-cover bg-center rounded-full'
                style={{
                    backgroundImage: `url(${values.avatar})`,
                }}
            />

            <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-10'>
                <div>
                    <input
                        className='w-2/3 pl-4 py-3 text-xl border-2 rounded-lg focus:outline-none focus:border-purple-400'
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
                        className='w-2/3 pl-4 py-3 text-xl border-2 rounded-lg focus:outline-none focus:border-purple-400'
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
                        className='w-2/3 pl-4 py-3 text-xl border-2 rounded-lg focus:outline-none focus:border-purple-400'
                        placeholder='password'
                        name='password'
                        value={values.password}
                        type='password'
                        autoComplete='off'
                        onChange={handleChange}
                        pattern='\d{4,}'
                        title='Пароль должен содержать минимум 4 цифры'
                        required
                    />
                </div>

                <div>
                    <input
                        className='w-2/3 px-4  py-3 text-xl border-2 rounded-lg focus:outline-none focus:border-purple-400'
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

                <button className='w-2/3 tracking-wide bg-purple-600 text-white py-3 rounded-lg mt-10 hover:bg-purple-500 transition-[0.4s] duration-[all]' type='submit'>
                    Изменить
                </button>
            </form>
        </div>
    );
};

export default Profile;