// Importing dependences
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

// Importing datas
import languagesData from '../data/raw-languages.json';

// Importing pages
import Menu from '../pages/client/menu/menu.jsx';
import SelectLanguage from '../pages/client/select-language/select-language.jsx';
import NotFound from '../pages/client/not-found/not-found.jsx';

function RedirectToMenu({ isSupported, browserLang }) {
    const { slug } = useParams();

    if (!isSupported) {return <SelectLanguage />};
    return <Navigate to={`/${slug}/menu/${browserLang}`} replace />;
};

function AppRoutes() {
    const browserLang = navigator.language?.slice(0, 2);
    const supported = languagesData.languages.map((l) => l.code);
    const isSupported = supported.includes(browserLang);
    
    return (
        <Routes>
            <Route path="/:slug" element={<RedirectToMenu isSupported={isSupported} browserLang={browserLang} />} />

            <Route path="/:slug/select-language" element={<SelectLanguage />} />

            <Route path='/:slug/menu/:lang' element={<Menu />} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;