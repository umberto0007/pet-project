import Slider from 'react-slick';
import settings from '#components/SliderSettings/sliderSettingsProducts';

import {productsApi} from '#store/dummyJson/products.api';
import ProductCardTemplate from '#components/ProductCardTemplate/ProductCardTemplate';





const FragrancesSlider = () => {
    const {data: products} = productsApi.useGetProductsQuery('')
    return (
        <Slider {...settings}>
            {
                products && products.map((product) =>
                    product.category === 'fragrances' &&
                    <ProductCardTemplate
                        {...product}
                        key={product.id}
                    />
                )
            }
        </Slider>
    );
};

export default FragrancesSlider;