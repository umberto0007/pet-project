import Slider from 'react-slick';
import settings from '#components/SliderSettings/sliderSettingsProducts';

import {productsApi} from '#store/dummyJson/products.api';
import ProductCardTemplate from '#components/ProductCardTemplate/ProductCardTemplate';



const GroceriesSlider = () => {

    const {data: products} = productsApi.useGetProductsQuery('')

    return (
        <Slider {...settings}>
            {
                products && products.map((product) =>
                    product.category === 'groceries' &&
                    <ProductCardTemplate
                        {...product}
                        key={product.id}
                    />
                )
            }
        </Slider>
    );
};

export default GroceriesSlider;