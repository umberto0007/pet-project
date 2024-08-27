import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../utils/routes';
import logo from '../images/logo.svg';
import {FaGithubSquare} from 'react-icons/fa';
import {BsWhatsapp} from 'react-icons/bs';
import {BsTelegram} from 'react-icons/bs';


const Footer: FC = () => {
    return (
        <footer className='mt-auto'>
            <hr className='mt-24'/>
            <div className='max-w-1440 m-auto h-20 flex justify-between items-center px-20'>
                <div className='w-20 h-5'>
                    <Link to={ROUTES.HOME}>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                <div className='underline font-semibold text-lg '>Developed by <span
                    className='text-grey'>umberto0007</span></div>
                <div className='flex gap-5'>
                    <Link target='_blank' to='https://github.com/umberto0007'>
                        <FaGithubSquare className='w-9 h-9'/>
                    </Link>
                    <Link target='_blank' to='https://wa.me/79202920447'>
                        <BsWhatsapp className='w-9 h-9'/>
                    </Link>
                    <Link target='_blank' to='https://t.me/AntonZheltyakov'>
                        <BsTelegram className='w-9 h-9'/>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;