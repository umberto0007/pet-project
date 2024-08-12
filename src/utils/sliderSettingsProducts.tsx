import {ArrowProps} from '../models/proporties.types';
import arrowRight from '../images/right_arrow.png'
import arrowLeft from '../images/left_arrow.png'


function SampleNextArrow(props: ArrowProps) {
    const {className, style, onClick} = props;
    return (
        <div className={className}
             onClick={onClick}
             style={{...style, marginRight: '17px'}}
        >
            <div className='w-20 h-20'><img src={arrowRight}/></div>
        </div>
    );
}

function SamplePrevArrow(props: ArrowProps) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            onClick={onClick}
            style={{...style, marginLeft: '-45px'}}
        >
            <div className='w-20 h-20'><img src={arrowLeft}/></div>
        </div>
    );
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>
};

export default settings