import React from 'react';
import './styles/index.css'
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './Routes/Routes';
import styles from './styles/App.module.css'



function App() {

    return (
              <div className={styles.app}>
                  <Header/>
                  <AppRoutes/>
                  <Footer/>
              </div>
    );
}

export default App;
