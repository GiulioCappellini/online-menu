import { useMemo, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../../components/header/header.jsx';
import getMenuData from '../../../utils/menuService.js';

import './menu.css';

function MenuDish({ 
    dish, 
    isItalianVisible, 
    onToggleItalian, 
    ui, 
    formatPrice,
    onScroll
}) {

    return (
        <article className="menu-dish">
            <div className="menu-dish-body">
                {isItalianVisible && (
                    <p className="menu-dish-name-it">
                        {dish.nameIt}
                    </p>
                )}
                <div className="menu-dish-row">
                    <button
                        type="button"
                        className="menu-dish-name"
                        onClick={onToggleItalian}
                    >
                        {dish.name}
                    </button>
                    <span 
                        className="menu-dish-leader" 
                        aria-hidden="true" 
                    />
                    <span className="menu-dish-price">
                        {formatPrice(dish.price)}
                    </span>
                </div>
                <p className="menu-dish-ingredients">{dish.ingredients.join(', ')}</p>
                {dish.allergies.length > 0 && (
                    <p
                        className="menu-dish-allergies"
                        onClick={() => onScroll('allergies')}
                    >
                        {ui.allergiesLabel}: {dish.allergies.join(', ')}
                    </p>
                )}
            </div>
            <div className="menu-dish-media">
                {dish.image && dish.image !== 'putImageUrl' ? (
                    <img
                        className="menu-dish-image"
                        src={dish.image}
                        alt={dish.name}
                    />
                ) : (<i className="ti ti-photo menu-dish-image-placeholder" aria-hidden="true" />)}
                <button
                    type="button"
                    className="menu-dish-zoom"
                    aria-label={ui.zoomImage}
                >
                    <i className="ti ti-zoom-in" aria-hidden="true" />
                </button>
            </div>
        </article>
    );
};

function Menu() {
    const { lang } = useParams();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeDishId, setActiveDishId] = useState(null);
    const [activeCategorySlug, setActiveCategorySlug] = useState(null);

    const menuData = useMemo(
        () => getMenuData(lang),
        [lang]
    );

    const { 
        categories, 
        allergiesLegend, 
        ui, 
        formatPrice 
    } = menuData;

    const prevPosition = useRef(0);

    const toggleSidebar = () => {setIsSidebarOpen(prev => !prev)};

    const closeSidebar = () => {setIsSidebarOpen(false)};

    const scrollToSection = (target) => {
        // In case it is a save position
        if (typeof target === "number") {
            window.scrollTo({
                top: target,
                behavior: "smooth"
            });
            return;
        };

        // In case it is a category
        setActiveCategorySlug(target);

        document.getElementById(target) ?.scrollIntoView({behavior: "smooth"});
        closeSidebar();
    };

    const handleScroll = (category) => {
        // Going to allergies
        if (category === 'allergies') {
            prevPosition.current = window.scrollY;
            scrollToSection('allergies');
            return;
        };

        // Back from where you are
        if (category === 'getBack') {
            scrollToSection(prevPosition.current);
            return;
        };

        // Normal category
        scrollToSection(category);
    };

    const toggleItalianName = (dishId) => {setActiveDishId(prev => prev === dishId ? null : dishId)};
    return (
        <div className="menu-page">
            <Header
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={toggleSidebar}
                ui={ui}
            />
            {isSidebarOpen && (
                <aside className="menu-sidebar">
                    <div className="menu-sidebar-header">
                        <span className="menu-sidebar-title">
                            {ui.categories}
                        </span>
                        <button
                            type="button"
                            className="menu-sidebar-close"
                            aria-label={ui.closeMenu}
                            onClick={closeSidebar}
                        >
                            <i className="ti ti-x" aria-hidden="true" />
                        </button>
                    </div>
                    <nav className="menu-sidebar-nav">
                        {categories.map(category => (
                            <button
                                key={category.slug}
                                type="button"
                                className={`menu-sidebar-item ${activeCategorySlug === category.slug ? 'menu-sidebar-item--active' : ''}`}
                                onClick={() => handleScroll(category.slug)}
                            >
                                <i className={`ti ${category.icon}`} aria-hidden="true" />
                                <span>
                                    {category.title}
                                </span>
                            </button>
                        ))}
                    </nav>
                    <button
                        type="button"
                        className="menu-sidebar-allergies"
                        onClick={() => handleScroll('allergies')}
                    >
                        <span className="menu-sidebar-allergies-label">
                            <i className="ti ti-alert-circle" aria-hidden="true"/>
                            {ui.allAllergies}
                        </span>
                        <i className="ti ti-chevron-right" aria-hidden="true" />
                    </button>
                </aside>
            )};
            <main className="menu-main">
                {categories.map(category => (
                    <section
                        key={category.slug}
                        id={category.slug}
                        className="menu-category"
                    >
                        <h2 className="menu-category-title">{category.title}</h2>
                        <div className="menu-category-dishes">
                            {category.dishes.map(dish => (
                                <MenuDish
                                    key={dish.id}
                                    dish={dish}
                                    isItalianVisible={activeDishId === dish.id}
                                    onToggleItalian={() =>toggleItalianName(dish.id)}
                                    ui={ui}
                                    formatPrice={formatPrice}
                                    onScroll={handleScroll}
                                />
                            ))}
                        </div>
                    </section>
                ))}
                <section id="allergies" className="menu-allergies-section">
                    <h2 className="menu-allergies-title">{allergiesLegend.title}</h2>
                    <button
                        type="button"
                        className="menu-sidebar-allergies"
                        onClick={() => handleScroll('getBack')}
                    >
                        Get Back
                    </button>
                    <ul className="menu-allergies-list">
                        {allergiesLegend.items.map(allergy => (
                            <li
                                key={allergy.code}
                                className="menu-allergy-item"
                            >
                                <span className="menu-allergy-code">
                                    {allergy.code}
                                </span>
                                <span className="menu-allergy-label">
                                    {allergy.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default Menu;