import React from 'react';
import './styles/index.css'
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './Routes/Routes';
import Wrapper from './components/Wrapper';




function App() {
    return (
       <Wrapper>
           <Header/>
           <AppRoutes/>
           <Footer/>
       </Wrapper>
    );
}

export default App;
