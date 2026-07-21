// Importing dependences
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Importing Utils
import organizeList from '../../../utils/organizeObjLists.js';

// Importing datas
import languagesData from '../../../data/raw-languages.json';

// Importing styles
import './select-language.css';

const languages = organizeList(languagesData.languages);

function SelectLanguages() {
    const [selected, setSelected] = useState('');

    return (
        <>
            <div className="main-container">
                <span className="name">Re Ferdinando</span>
                <h1>Select your language</h1>
                <p>Choose a language to see the menu</p>
                <nav>
                    {languages.map((language => (
                        <Link
                            to={`../menu/${language.code}`}
                            key={language.code}
                            onClick={() => {
                                setSelected(language.code);
                            }}
                            className={`button ${selected === language.code ? 'selected-button' : ''}`}
                        >
                            <span className="button-code">
                                {language.flag}
                            </span>
                            <span className="button-text">
                                <span className="text">{language.name}</span>
                                <span className="nativeName">{language.nativeName}</span>
                            </span>
                            <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 6l6 6-6 6"/>
                            </svg>
                        </Link>
                    )))}
                </nav>
            </div>
        </>
    );
};

export default SelectLanguages;
