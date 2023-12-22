// components/Header.js
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { Container, AuthContainer, AuthButton, HeaderButton } from '../styles/styles';

const Header = ({ user }) => {
    const router = useRouter();

    // Check if window and localStorage are defined (client-side)
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
            localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn on logout
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
                    <Link href="/">
                        <HeaderButton>Home</HeaderButton>
                    </Link>
                    {isLoggedIn && (
                        <HeaderButton onClick={handleCreatePageItem}>Create Page Item</HeaderButton>
                    )}
                </nav>
                {!isLoggedIn ? (
                    <AuthContainer>
                        <AuthButton onClick={handleLogin}>Login</AuthButton>
                        <Link href="/register">
                            <AuthButton>Register</AuthButton>
                        </Link>
                    </AuthContainer>
                ) : (
                    <AuthButton onClick={handleLogout}>Logout</AuthButton>
                )}
            </header>
        </Container>
    );
};

export default Header;
