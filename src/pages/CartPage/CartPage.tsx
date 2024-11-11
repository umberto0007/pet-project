import Button from '#components/UI/Button';

const CartPage = () => {
    return (
        <div className='mt-24'>
            <h1 className='font-bold text-4xl text-grey tracking-wide'>Корзина пуста</h1>
            <p className='mt-6 text-lg tracking-wide'>Чтобы наполнить корзину авторизируйтесь</p>
            <div className='mt-10'>
                <button className='bg-blue-100 p-5 tracking-wide text-lg rounded-lg hover:bg-blue-200'>Авторизоваться</button>
            </div>
        </div>
    );
};

export default CartPage;