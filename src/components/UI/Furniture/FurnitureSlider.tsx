import React from 'react';

import Slider from 'react-slick';

import settings from '#utils/SliderSettings/sliderSettingsProducts';
import {ChildProps} from '#types/models/product.types';
import ProductCard from '#components/UI/CardTemplate/ProductCard';




const FurnitureSlider: React.FC<ChildProps> = ({products}) => {

    return (
        <Slider {...settings}>
            {
                products && products.map((product, id) =>
                    product.category === 'furniture' &&
                    <div key={id}>
                            <ProductCard
                                {...product}
                                key={product.id}
                            />
                    </div>
                )
            }
        </Slider>
    );
};

export default FurnitureSlider;