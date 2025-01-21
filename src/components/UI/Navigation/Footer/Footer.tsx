import {Link} from 'react-router-dom';

import logo from '#assets/icons/logo.svg';
import FooterNavigate from './FooterNavigate';
import {ROUTES} from '#utils/routes';


const Footer = () => {
    return (
        <footer className='mt-auto bg-white'>
            <hr/>
            <div className='max-w-1440 m-auto h-20 flex justify-between items-center px-20 container'>
                <div className='w-20 h-5 shrink-0 mr-5'>
                    <Link to={ROUTES.HOME}>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                <div className='underline font-semibold text-lg tracking-wide whitespace-nowrap'>Developed by
                    <span
                        className='text-grey whitespace-nowrap'> umberto0007
                    </span>
                </div>
                <FooterNavigate/>
            </div>
        </footer>
    );
};

export default Footer;