import React, {useState} from 'react';

import {ChildProps} from '#types/models/product.types';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import stub from '#assets/stub/stub.webp'
import Description from '#pages/CardPage/Description';




const SomeImages: React.FC<ChildProps> = ({product}) => {

    const [currentImg, setCurrentImg] = useState(product && product.images[0])


    return (
        <div className='mt-5 flex justify-between'>
            <div className='flex gap-5'>
                <div className='flex flex-col items-center gap-5 w-20 h-20'>
                    {product && product.images.map((image,i) =>
                        <LazyLoadImage
                            placeholderSrc={stub}
                            key={i}
                            className={`${image === currentImg ? 'border border-black' : ''} cursor-pointer shadow-md p-1`}
                            src={image}
                            onClick={() => setCurrentImg(image)}
                        />
                    )}
                </div>

                <div className='w-496 h-496 shadow-md'>
                    <LazyLoadImage className='object-contain w-full h-full' src={currentImg}/>
                </div>

            </div>
            <div className='flex flex-col justify-between w-2/4 gap-20 ml-5'>
                <Description product={product}/>
            </div>
        </div>
    );
};

export default SomeImages;