import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import {ROUTES} from '#utils/routes';
import HomePage from '#pages/HomePage/HomePage';
import CardProductPage from '#pages/CardProductPage';
import CartPage from '#pages/CartPage';



const AppRoutes:FC = () => {
    return (
        <main className='container px-20 pt-32'>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path={ROUTES.PRODUCT} element={<CardProductPage/>}/>
                <Route path={ROUTES.CART} element={<CartPage/>}/>
            </Routes>
        </main>
    );
};

export default AppRoutes;