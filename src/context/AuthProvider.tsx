"use client"

import { createContext, ReactNode, useEffect, useState, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import LogoutOverlay from '@/components/LogOutOverlay';

type Props = {
    children?: ReactNode;
};

type IAuthContext = {
    authenticated: boolean;
    handleLogout: () => void;
    handleLogin: () => void;
};

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState(getCookie('token') ? true : false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        deleteCookie("token", { path: '/', domain: 'localhost' });
        setAuthenticated(false);
        router.push('/');
    };

    const handleLogin = () => {
        setAuthenticated(true);
    }

    useEffect(() => {
        if (!authenticated && pathname !== "/") {
            router.push("/")
        }
        if (authenticated && pathname === "/") {
            router.push("/events")
        }
    }, [authenticated, router, pathname])

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin, handleLogout }}>
            {children}
            {authenticated && <LogoutOverlay />}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (context === null) {
        throw new Error("useAuthContext must be used within a AuthProvider")
    }
    return { ...context }
}
