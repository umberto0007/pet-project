import {ArrowProps} from '../models/proporties.types';
import React from 'react';

function SampleNextArrow(props: ArrowProps) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                background: 'transparent',
                right: '25px',
                zIndex: '1',
                transform: 'scale(2)',
                top: '40%'
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
                display: 'block',
                background: 'transparent',
                left: '25px',
                zIndex: '1',
                transform: 'scale(2)',
                top: '40%'
            }}
            onClick={onClick}
        />
    );
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>
}

export default settings