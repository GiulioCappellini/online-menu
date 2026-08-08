import { Link, useParams } from 'react-router-dom';
import './header.css';
import Logo from '../../../public/assets/logo_black.svg';

function Header({ isSidebarOpen, onToggleSidebar, ui }) {
    const { slug } = useParams();
    return (
        <header className="menu-header">
            <button
                type="button"
                className="menu-header-burger"
                aria-label={ui.openMenu}
                aria-expanded={isSidebarOpen}
                onClick={onToggleSidebar}
            >
                <i className="ti ti-menu-2" aria-hidden="true" />
            </button>

            <div className="menu-header-brand">
                <div className="menu-header-logo">
                    <img src={Logo} alt='Logo'></img>
                </div>
                <span className="menu-header-name">Re Ferdinando</span>
            </div>

            <Link 
                to={`/${slug}/select-language/`}
                className="menu-button-code"
            >
                {ui.Lang}
            </Link>
        </header>
    );
}

export default Header;
