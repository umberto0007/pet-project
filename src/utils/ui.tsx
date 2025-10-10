import {FaStar} from "react-icons/fa";

// Функция для создания звезд
export const renderStars = (count: number) => {
    return [...Array(count)].map((_, index) => (
        <FaStar key={index} fill='black'/>
    ));
};