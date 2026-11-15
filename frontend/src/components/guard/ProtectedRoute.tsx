import { useAuth } from '../../contexts/useAuth';
import { useLocation, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    
    // Hooks: 
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation(); //memorise page que l'utilisateur essaie d'afficher

    if (isLoading) {
        return <div className="spinner">Chargement en cours...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to='/login' state={{ from: location }} replace/>
    }
    return <>{children}</>;
}