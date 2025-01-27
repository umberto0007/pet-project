import {FormsProps} from '#types/entities/formsProps';

const RegistrationButton = ({handleClick}: FormsProps) => {
    return (
        <div className='flex flex-col'>
            <p className='mt-6 text-lg tracking-wide'>Чтобы наполнить корзину авторизируйтесь</p>
            <button title='Авторизоваться' onClick={handleClick}
                    className='bg-blue-100 py-3 rounded-lg mt-10 max-w-72 hover:bg-blue-200 transition-[0.4s] duration-[all] text-lg tracking-wide'>Авторизоваться
            </button>
        </div>
    );
};

export default RegistrationButton;