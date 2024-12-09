import {FOOTER_NAV} from '#utils/constants';
import {Link} from 'react-router-dom';


const FooterNavigate = () => {
    return (
        <div className='flex gap-6 ml-5'>
            {FOOTER_NAV.map((props) =>
                <nav key={props.id}>
                    <ul>
                        <li>
                            <Link target='_blank' to={props.path}>
                                <props.icon size={30}/>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default FooterNavigate;