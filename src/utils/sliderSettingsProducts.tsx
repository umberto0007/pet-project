import {ArrowProps} from '../models/proporties.types';

function SampleNextArrow(props: ArrowProps) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: '#9e9d9c',
                borderRadius: '50%',
                zIndex: '1',
                transform: 'scale(1.5)',
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: ArrowProps) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: '#9e9d9c',
                borderRadius: '50%',
                zIndex: '1',
                transform: 'scale(1.5)',
        }}
            onClick={onClick}
        />
    );
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>
};

export default settings