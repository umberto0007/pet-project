import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import {ROUTES} from '#utils/routes';
import HomePage from '#pages/HomePage/HomePage';
import CatalogPage from '#pages/CatalogPage';
import CardProductPage from '#pages/CardProductPage';
import CartPage from '#pages/CartPage';



const AppRoutes:FC = () => {
    return (
        <main className='container px-20'>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path={ROUTES.CATALOG} element={<CatalogPage/>}/>
                <Route path={ROUTES.PRODUCT} element={<CardProductPage/>}/>
                <Route path={ROUTES.CART} element={<CartPage/>}/>
            </Routes>
        </main>
    );
};

export default AppRoutes;