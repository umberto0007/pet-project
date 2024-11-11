import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';

import {ROUTES} from '#utils/routes';



import CartPage from '#pages/CartPage/CartPage';
import BreadCrumbs from '#components/BreadCrumbs/BreadCrumbs';
import Loader from '#components/Loader/Loader';

const Homepage = lazy(() => import('#pages/HomePage/HomePage'))
const CategoryPage = lazy(() => import('#pages/CategoryPage/CategoryPage'))
const CardPage = lazy(() => import('#pages/CardPage/CardPage'))

const AppRoutes = () => {
    return (
        <main className='container px-20 pt-32'>
            <BreadCrumbs/>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route index element={<Homepage/>}/>
                    <Route path={ROUTES.CATEGORIES} element={<CategoryPage/>}/>
                    <Route path={ROUTES.CARD} element={<CardPage/>}/>
                    <Route path={ROUTES.CART} element={<CartPage/>}/>
                </Routes>
            </Suspense>
        </main>
    );
};

export default AppRoutes;