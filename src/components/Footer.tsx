import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../utils/routes';
import logo from '../images/logo.svg';
import { FaGithubSquare } from 'react-icons/fa';
import { BsWhatsapp } from 'react-icons/bs';
import { BsTelegram } from 'react-icons/bs';


const Footer = () => {
    return (
        <footer className='mt-auto'>
            <hr/>
            <div className='max-w-1440 m-auto h-20 flex justify-between items-center px-20'>
                <div className='w-20 h-5'>
                    <Link to={ROUTES.HOME}>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                <div className='underline font-semibold text-lg '>Developed by <span className='text-grey'>umberto0007</span></div>
                <div className='flex gap-5'>
                    <a target='_blank' href='https://github.com/umberto0007'>
                        <FaGithubSquare className='w-9 h-9'/>
                    </a>
                    <a target='_blank' href='https://wa.me/79202920447'>
                        <BsWhatsapp className='w-9 h-9'/>
                    </a>
                    <a target='_blank' href='https://t.me/AntonZheltyakov'>
                        <BsTelegram className='w-9 h-9'/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;