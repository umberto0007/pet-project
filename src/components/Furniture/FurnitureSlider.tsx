import Slider from 'react-slick';
import settings from '#utils/SliderSettings/sliderSettingsProducts';

import {productsSliceApi} from '#redux/api/productsSlice.api';
import ProductCard from '#components/CardTemplate/ProductCard';
import {Link} from 'react-router-dom';
import React from 'react';
import {ChildProps} from '#types/models/product.types';


const FurnitureSlider: React.FC<ChildProps> = ({products}) => {

    return (
        <Slider {...settings}>
            {
                products && products.map((product, id) =>
                    product.category === 'furniture' &&
                    <div key={id}>
                        <Link to={`furniture/${id + 1}`}>
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

export default FurnitureSlider;