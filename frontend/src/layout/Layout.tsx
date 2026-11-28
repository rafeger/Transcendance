import { Outlet } from 'react-router-dom';
import { useRoom } from '../contexts/useRoom';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout() {
    
    const { isConnected } = useRoom();  
    const [hasEverConnected, setHasEverConnected] = useState(false);

    useEffect(() => {
        if (isConnected) {
            setHasEverConnected(true);
        }
    }, [isConnected]);

    const showReconnectingBannier = hasEverConnected && !isConnected;
    return (
       
        <div className="flex min-h-screen flex-col">
            <Header />
            {showReconnectingBannier && (
                <div
                role="alert"
                className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium shadow-md flex items-center justify-center gap-2 alert theme-inverse"
                >
                <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'/>
                <span>Connection Lost...RECONNECTION IN PROGRESS...</span>
                </div>
            )}

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default Layout;
