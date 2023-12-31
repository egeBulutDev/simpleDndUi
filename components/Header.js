// components/Header.js
import React from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { Container, AuthContainer, AuthButton, HeaderButton } from '../styles/styles';

const Header = ({ user }) => {
    const router = useRouter();

    const isLoggedIn =
        typeof window !== 'undefined' &&
        typeof window.localStorage !== 'undefined' &&
        window.localStorage.getItem('isLoggedIn') === 'true';

    const handleLogin = () => {
        router.push('/login');
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleCreatePageItem = () => {
        router.push('/create-page-item');
    };

    return (
        <Container>
            <header style={{ backgroundColor: '#859ddb', padding: '10px' }}>
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                    {isLoggedIn && (
                        <HeaderButton onClick={handleCreatePageItem}>Create Page Item</HeaderButton>
                    )}
                </nav>
                {!isLoggedIn ? (
                    <AuthContainer>
                        <AuthButton onClick={handleLogin}>Login</AuthButton>
                    </AuthContainer>
                ) : (
                    <AuthButton onClick={handleLogout}>Logout</AuthButton>
                )}
            </header>
        </Container>
    );
};

export default Header;
