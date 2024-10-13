import Slider from 'react-slick';
import settings from '#components/SliderSettings/sliderSettingsProducts';

import {productsApi} from '#store/dummyJson/products.api';
import ProductCardTemplate from '#components/CardTemplate/ProductCardTemplate';
import {Link} from 'react-router-dom';


const GroceriesSlider = () => {

    const {data: products} = productsApi.useGetProductsQuery('')

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