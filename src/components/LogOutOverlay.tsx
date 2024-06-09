import React from 'react';
import { useAuthContext } from '../context/AuthProvider';

const LogoutOverlay = () => {
    const { handleLogout } = useAuthContext();

    return (
        <div className='fixed bottom-0 left-0 z-10'>
            <button onClick={handleLogout} title="Logout" className="px-4 py-2 m-4 rounded-full text-2xl bg-red-500 text-white">
                🚀
            </button>
        </div>
    );
}

export default LogoutOverlay;