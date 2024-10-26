import React from 'react';
import {Link} from 'react-router-dom';

import Slider from 'react-slick';

import settings from '#components/SliderSettings/sliderSettingsProducts';
import ProductCardTemplate from '#components/CardTemplate/ProductCardTemplate';
import {ChildProps} from '#models/product.types';


const GroceriesSlider: React.FC<ChildProps> = ({products}) => {

    return (
        <Slider {...settings}>
            {
                products && products.map((product, id) =>
                    product.category === 'groceries' &&
                    <div key={id}>
                        <Link to={`groceries/${id + 1}`}>
                            <ProductCardTemplate
                                {...product}
                                key={product.id}
                            />
                        </Link>
                    </div>
                )
            }
        </Slider>
    );
};

export default GroceriesSlider;