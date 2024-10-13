import React, {FC} from 'react';

import './styles/index.css'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './Routes/Routes';



const App: FC = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header/>
            <AppRoutes/>
            <Footer/>
        </div>
    );
}

export default App;
