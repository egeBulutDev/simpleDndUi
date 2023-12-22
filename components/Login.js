// pages/login.js
import React, { useState } from 'react';
import axios from '../utils/axios';
import { useRouter } from 'next/router';
import { FormContainer, SubmitButton, BackButton } from '../styles/styles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('isLoggedIn', 'true'); // Set isLoggedIn to true
            router.push('/');
        } catch (error) {
            console.error('Login error', error.response.data);
        }
    };

    return (
        <FormContainer>
            <h2>Login</h2>
            <form>
                <label style={{ marginBottom: '10px' }}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px' }}
                />

                <label style={{ marginBottom: '10px' }}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px' }}
                />

                <SubmitButton type="button" onClick={handleLogin}>
                    Sign In
                </SubmitButton>
            </form>
            <p>
                Need an account?{' '}
                <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => router.push('/register')}>
          Register Here
        </span>
            </p>
            <BackButton onClick={() => router.push('/')}>Back to Home</BackButton>
        </FormContainer>
    );
};

export default Login;
