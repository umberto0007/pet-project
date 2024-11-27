import React from 'react';

import {ChildProps} from '#types/models/product.types';
import Description from '#pages/CardPage/Description';

const OneImage: React.FC<ChildProps> = ({product}) => {

    return (
        <div className='mt-5 flex gap-10 justify-between'>
            <img className='w-1/2 shadow-md' src={product && product.images[0]}/>
            <div className='flex flex-col justify-between w-2/3 ml-5'>
                <Description product={product}/>
            </div>
        </div>
    );
};

export default OneImage;