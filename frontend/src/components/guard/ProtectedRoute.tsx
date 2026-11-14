import { useAuth, isAuthentificates, isLoading } from '../pages/Auth.tsx';
import { useLocation } from 'react-router-dom';


if (isLoading(true)) {
    return <div className="spinner">Chargement en cours...</div>;
}