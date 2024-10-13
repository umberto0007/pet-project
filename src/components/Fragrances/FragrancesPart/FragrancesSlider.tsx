import Slider from 'react-slick';
import settings from '#components/SliderSettings/sliderSettingsProducts';

import {productsApi} from '#store/dummyJson/products.api';
import ProductCardTemplate from '#components/CardTemplate/ProductCardTemplate';
import {Link} from 'react-router-dom';


const FragrancesSlider = () => {
    const {data: products} = productsApi.useGetProductsQuery('')

    console.log(products)

    return (
        <Slider {...settings}>
            {
                products && products.map((product, id) =>
                    product.category === 'fragrances' &&
                    <div key={id}>
                        <Link to={`/fragrances/${id + 1}`}>
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

export default FragrancesSlider;