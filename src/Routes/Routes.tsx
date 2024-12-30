import {lazy, Suspense, useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';

import {ROUTES} from '#utils/routes';


import CartPage from '#pages/CartPage/CartPage';
import BreadCrumbs from '#components/BreadCrumbs/BreadCrumbs';
import Loader from '#components/Loader/Loader';
import Profile from '#pages/Profile/Profile';

const Homepage = lazy(() => import('#pages/HomePage/HomePage'))
const CategoryPage = lazy(() => import('#pages/CategoryPage/CategoryPage'))
const CardPage = lazy(() => import('#pages/CardPage/CardPage'))

const AppRoutes = () => {
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/cart') {
            document.body.style.backgroundColor = '#f6f6f6'
        } else {
            document.body.style.backgroundColor = '';
        }
    }, [location]);

    return (
        <main className='container px-20 pt-32 mb-24'>
            <BreadCrumbs/>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route index element={<Homepage/>}/>
                    <Route path={ROUTES.CATEGORIES} element={<CategoryPage/>}/>
                    <Route path={ROUTES.PROFILE} element={<Profile/>}/>
                    <Route path={ROUTES.CARD} element={<CardPage/>}/>
                    <Route path={ROUTES.CART} element={<CartPage/>}/>
                </Routes>
            </Suspense>
        </main>
    );
};

export default AppRoutes;