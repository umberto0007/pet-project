import React from 'react';

import Slider from 'react-slick';

import settings from '#utils/SliderSettings/sliderSettingsProducts';
import {ChildProps, IProduct} from '#types/models/product.types';
import ProductCard from '#components/UI/CardTemplate/ProductCard';


const GroceriesSlider: React.FC<ChildProps> = ({products = {} as IProduct[]}) => {

    return (
        <Slider {...settings}>
            {
                products.map((product, id) =>
                    product.category === 'groceries' &&
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

export default GroceriesSlider;