import React, {FC} from 'react';
import {Link} from 'react-router-dom';


import logo from '#assets/logo.svg';
import FooterNavigate from './FooterPart/FooterNavigate';
import {ROUTES} from '#utils/routes';


const Footer: FC = () => {
    return (
        <footer className='mt-auto'>
            <hr className='mt-24'/>
            <div className='max-w-1440 m-auto h-20 flex justify-between items-center px-20 container'>
                <div className='w-20 h-5'>
                    <Link to={ROUTES.HOME}>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                <div className='underline font-semibold text-lg '>Developed by
                    <span
                        className='text-grey'>umberto0007
                    </span>
                </div>
                <FooterNavigate/>
            </div>
        </footer>
    );
};

export default Footer;