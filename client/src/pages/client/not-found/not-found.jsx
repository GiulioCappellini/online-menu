// Importing styles
import { useNavigate } from 'react-router-dom';
import './not-found.css';

function NotFound() {
    const navigate = useNavigate();
    
    return (
        <>
            <span className="container-mesage">
                <h1>ERROR: 404</h1>
                <p>Page not found</p>
                <button
                    className='back-button'
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </span>
        </>
    );
};

export default NotFound;