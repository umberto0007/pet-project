import React from 'react';

const SkeletonCategories = () => {
    return (
        <div className='flex justify-between gap-14'>
            {[...Array(10)].map((_, index) => (
                <div key={index} className='w-20 h-4 bg-gray-300 mt-2'/>
            ))}
        </div>
    );
};

export default SkeletonCategories;