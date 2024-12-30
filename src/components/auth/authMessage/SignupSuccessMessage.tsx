import {FormsProps} from '#types/entities/formsProps';
import {useEffect} from 'react';


const SignupSuccessMessage = ({active, setActive = () => {}}: FormsProps) => {

    useEffect(() => {
        if (active) {
            const timer = setTimeout(() => {
                 setActive(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [active]);

    return (
        <div
            className={`${active ? 'visible translate-x-0' : 'invisible translate-x-60'} fixed top-16 right-0 w-96 bg-white border-t-4 border-green-700 shadow-md rounded-b px-4 py-3 transition-transform duration-300`}
            role='alert'>
            <div className='flex items-center'>
                <div className='py-1'>
                    <svg className='fill-current h-6 w-6 text-green-700 mr-4' xmlns='http://www.w3.org/2000/svg'
                         viewBox='0 0 20 20'>
                        <path
                            d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z'/>
                    </svg>
                </div>
                <div>
                    <p className='font-bold tracking-wide'>Вы успешно зарегестрировались!</p>
                </div>
            </div>
        </div>
    );
};

export default SignupSuccessMessage;