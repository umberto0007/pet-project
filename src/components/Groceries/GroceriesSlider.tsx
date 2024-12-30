import React from 'react';
import {Link} from 'react-router-dom';

import Slider from 'react-slick';

import settings from '#utils/SliderSettings/sliderSettingsProducts';
import ProductCard from '#components/CardTemplate/ProductCard';
import {ChildProps, IProduct} from '#types/models/product.types';


const GroceriesSlider: React.FC<ChildProps> = ({products = {} as IProduct[]}) => {

    return (
        <Slider {...settings}>
            {
                products.map((product, id) =>
                    product.category === 'groceries' &&
                    <div key={id}>
                        <Link to={`groceries/${id + 1}`}>
                            <ProductCard
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