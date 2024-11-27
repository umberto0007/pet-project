import React, {useState} from 'react';
import {authSliceApi} from '#redux/api/authSlice.api';
import {LoginUser} from '#types/entities/user';
import {Target} from '#types/entities/target';
import {FormsProps} from '#types/entities/formsProps';


const UserLoginForm = ({active, setActive, toggleCurrentFormType}: FormsProps) => {
    const [loginUser, {data: token}] = authSliceApi.useLoginUserMutation()
    const {data} = authSliceApi.useGetProfileQuery()
    const [values, setValues] = useState<LoginUser>({
        email: '',
        password: ''
    })
    console.log(token)
    console.log(data)
    const {email, password} = values

    const handleChange = ({target: {value, name}}: Target) => {
        setValues({...values, [name]: value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await loginUser({email, password}).unwrap()
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error)
        }
        setActive(false)
        setValues({
            email: '',
            password: ''
        })
    }


    return (
        <div
            className={`${active ? 'active [&.active]: opacity-100  pointer-events: all' : 'opacity-0 pointer-events-none'} z-10 h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex items-center justify-center transition-[0.5s] left-0 top-0`}
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
                            required
                        />
                    </div>
                    <div className='text-purple-800 hover:text-purple-600 cursor-pointer'
                         onClick={() => toggleCurrentFormType && toggleCurrentFormType('signup')}>Создать аккаунт
                    </div>
                    <button
                        className='bg-blue-100 w-1/2 py-4 m-auto rounded-lg hover:bg-blue-200 transition-[0.4s] duration-[all] font-bold tracking-wide text-lg text-gray-600'
                        type='submit'>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};


export default UserLoginForm;