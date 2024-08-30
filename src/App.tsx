import React, {FC} from 'react';

import './styles/index.css'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './Routes/Routes';
import Wrapper from './components/Wrapper/Wrapper';



const App: FC = () => {
    return (
        <Wrapper>
            <Header/>
            <AppRoutes/>
            <Footer/>
        </Wrapper>
    );
}

export default App;
