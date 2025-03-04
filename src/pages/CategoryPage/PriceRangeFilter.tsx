import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // стили для rc-slider

const PriceRangeFilter = () => {
    return (
        <div className='p-2'>
            <Slider range/>
        </div>
    )
};

export default PriceRangeFilter;