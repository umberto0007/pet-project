import React from 'react';

const SkeletonBrands = () => {
    return (
        <div className='flex gap-4 flex-wrap'>
            {[...Array(9)].map((_, index) => (
                <div key={index} className='p-5 w-32 h-20 bg-gray-300 rounded-lg'/>
            ))}
        </div>
    );
};

export default SkeletonBrands;