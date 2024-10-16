const SkeletonCardPage = () => {
    return (
        <div className='mt-5 flex gap-10 justify-between'>
            <div
                className='relative min-h-640 min-w-640 flex justify-center items-center bg-gray-300 animate-pulse'>
                <svg
                    className='w-64 h-64 text-gray-200 dark:text-gray-600'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 18'
                >
                    <path
                        d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z'/>
                </svg>
            </div>
            <div className='flex flex-col justify-between w-2/3'>
                <div>
                    <div className='w-2/3 h-11 bg-gray-300 rounded-lg'/>
                    <div className='flex items-center gap-10'>
                        <div className='mt-4 w-1/4 h-5 bg-gray-300 rounded-lg'/>
                        <div className='flex items-center'>
                            <div className='mt-4 w-9 h-5 bg-gray-300 rounded-lg'/>
                            <div className='ml-3 mt-4 w-24 h-5 bg-gray-300 rounded-lg'/>
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-32'>
                    <div>
                        <div className='flex items-center gap-4'>
                            <div className='w-16 h-10 bg-gray-300 rounded-lg'/>
                            <div className='bg-gray-300 rounded-md w-12 h-7'/>
                        </div>
                        <div className='w-16 h-10 bg-gray-300 rounded-lg mt-5'/>
                    </div>
                    <div className='w-48 h-14 bg-gray-300 rounded-lg'/>
                </div>
                <div>
                    <div className='max-w-36 h-11 bg-gray-300 rounded-lg'/>
                    <div className='mt-5 w-full h-5 bg-gray-300 rounded-lg'/>
                    <div className='mt-5 w-full h-5 bg-gray-300 rounded-lg'/>
                    <div className='mt-5 w-full h-5 bg-gray-300 rounded-lg'/>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCardPage;