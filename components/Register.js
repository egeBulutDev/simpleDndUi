// pages/register.js
import React, { useState } from 'react';
import axios from '../utils/axios';
import { useRouter } from 'next/router';
import { FormContainer, SubmitButton, BackButton } from '../styles/styles';

const Register = () => {
    const [name, setName] = useState(''); // Update to use 'name' instead of 'username'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            await axios.post('/api/register', { name, email, password }); // Update to use 'name' instead of 'username'
            router.push('/');
        } catch (error) {
            console.error('Register error', error.response.data);
        }
    };

    return (
        <FormContainer>
            <h2>Register</h2>
            <form>
                <label style={{ marginBottom: '10px' }}>Name:</label> {/* Update label to 'Name' */}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Update to use 'name' instead of 'username'
                    style={{ marginBottom: '10px', padding: '5px' }}
                />

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

                <SubmitButton type="button" onClick={handleRegister}>
                    Sign Up
                </SubmitButton>
            </form>
            <p>
                Already have an account?{' '}
                <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => router.push('/login')}>
                    Login Here
                </span>
            </p>
            <BackButton onClick={() => router.push('/')}>Back to Home</BackButton>
        </FormContainer>
    );
};

export default Register;
