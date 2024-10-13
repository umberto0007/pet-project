const HeaderForm = () => {
    return (
        <form className='flex items-center bg-light-grey-search w-3/5 rounded-lg'>
            <div className='w-4 h-4 m-3'>
                <svg className='w-full h-full fill-grey'>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/search.svg#search`}/>
                </svg>
            </div>
            <input className='w-full mr-2 bg-light-grey-search outline-0 placeholder-grey'
                   type='search'
                   name='search'
                   placeholder='Поиск'
                   autoComplete='off'
            />
        </form>
    );
};

export default HeaderForm;