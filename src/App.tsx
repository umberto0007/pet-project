import './styles/index.css'

import Header from '#components/UI/Navigation/Header/Header';
import Footer from '#components/UI/Navigation/Footer/Footer';
import AppRoutes from './Routes/Routes';



const App = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header/>
            <AppRoutes/>
            <Footer/>
        </div>
    );
}

export default App;
