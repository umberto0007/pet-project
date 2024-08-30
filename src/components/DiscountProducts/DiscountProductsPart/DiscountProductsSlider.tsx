import Slider from 'react-slick';
import settings from '#components/SliderSettings/sliderSettingsProducts';

import {productsApi} from '#store/dummyJson/products.api';
import ProductCardTemplate from '#components/ProductCardTemplate/ProductCardTemplate';



const DiscountProductsSlider = () => {
    const {data: discountProducts} = productsApi.useGetProductsQuery('')
    return (
        <Slider  {...settings}>
            {discountProducts && discountProducts.map((product) =>
                product.discountPercentage >= 15 &&
                <ProductCardTemplate
                    {...product}
                    key={product.id}
                />
            )}
        </Slider>
    );
};

export default DiscountProductsSlider;