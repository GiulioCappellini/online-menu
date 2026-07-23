import { Link } from 'react-router-dom';
import './header.css';

function Header({ isSidebarOpen, onToggleSidebar, ui }) {
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
                    <span>R</span>
                </div>
                <span className="menu-header-name">Re Ferdinando</span>
            </div>

            <Link 
                to="/select-language"
                className="menu-button-code"
            >
                {ui.changeLang}
            </Link>
        </header>
    );
}

export default Header;
