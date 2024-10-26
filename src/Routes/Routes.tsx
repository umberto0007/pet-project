import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import {ROUTES} from '#utils/routes';
import HomePage from '#pages/HomePage/HomePage';

import CartPage from '#pages/CartPage/CartPage';
import CategoryPage from '#pages/CategoryPage/CategoryPage';
import CardPage from '#pages/CardPage/CardPage';
import BreadCrumbs from '#components/BreadCrumbs/BreadCrumbs';



const AppRoutes:FC = () => {
    return (
        <main className='container px-20 pt-32'>
            <BreadCrumbs/>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path={ROUTES.CATEGORIES} element={<CategoryPage/>}/>
                <Route path={ROUTES.CARD} element={<CardPage/>}/>
                <Route path={ROUTES.CART} element={<CartPage/>}/>
            </Routes>
        </main>
    );
};

export default AppRoutes;