import React from 'react';

const SkeletonBrands = () => {
    return (
        <div className='flex gap-4 flex-wrap mt-14'>
            {[...Array(18)].map((_, index) => (
                <div key={index} className='w-32 h-16 bg-gray-300'/>
            ))}
        </div>
    );
};

export default SkeletonBrands;