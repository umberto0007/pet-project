import BASKET from '#assets/basket.svg';

const Button = () => {
    return (
        <button className='bg-blue-100 p-2 rounded-lg mt-10 w-full hover:bg-blue-200'>
            <div className='flex items-center justify-center gap-3'>
                <img src={BASKET}/>
                <span className='text-lg'>В корзину</span>
            </div>
        </button>
    );
};

export default Button;
