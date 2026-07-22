// Importing dependences
import { Routes, Route, Navigate } from 'react-router-dom';

// Importing datas
import languagesData from '../data/raw-languages.json';

// Importing pages
import Menu from '../pages/client/menu/menu.jsx';
import SelectLanguage from '../pages/client/select-language/select-language.jsx';
import NotFound from '../pages/client/not-found/not-found.jsx';

function AppRoutes() {
    const browserLang = navigator.language?.slice(0, 2);
    const supported = languagesData.languages.map((l) => l.code);
    const isSupported = supported.includes(browserLang);
    
    return (
        <Routes>
            <Route path="/" element={isSupported ? <Navigate to={`/menu/${browserLang}`} /> : <SelectLanguage />} />

            <Route path="/select-language" element={<SelectLanguage />} />

            <Route path='/menu/:lang' element={<Menu />} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;