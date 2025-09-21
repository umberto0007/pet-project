import {FormsProps} from '#types/entities/formsProps';

const RegistrationButton = ({handleClick}: FormsProps) => {
    return (
        <div title='Авторизоваться' className='flex flex-col'>
            <p className='mt-6 text-lg tracking-wide'>Чтобы наполнить корзину авторизируйтесь</p>
            <button title='Авторизоваться' onClick={handleClick}
                    className='bg-purple-600 py-3 rounded-lg mt-10 max-w-72 hover:bg-purple-500 transition duration-300 ease-in-out text-lg text-white tracking-wide'>Авторизоваться
            </button>
        </div>
    );
};

export default RegistrationButton;