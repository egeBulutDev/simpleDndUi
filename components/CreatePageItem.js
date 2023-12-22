// pages/create-page-item.js
import React, { useState } from 'react';
import axios from '../utils/axios';
import { useRouter } from 'next/router';
import { FormContainer, SubmitButton, BackButton } from '../styles/styles';

const CreatePageItem = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pageActionLink, setPageActionLink] = useState('');
    const [pageHeroImage, setPageHeroImage] = useState('');
    const [author, setAuthor] = useState('');
    const router = useRouter();

    const handleCreatePageItem = async () => {
        try {
            await axios.post('/api/create-page-item', { title, content, page_action_link: pageActionLink, page_hero_image: pageHeroImage, author });
            router.push('/');
        } catch (error) {
            console.error('Create Page Item error', error.response.data);
        }
    };

    return (
        <FormContainer>
            <h2>Create Page Item</h2>
            <form>
                <label style={{ marginBottom: '10px' }}>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px' }}
                />

                <label style={{ marginBottom: '10px' }}>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px' }}
                />

                <label style={{ marginBottom: '10px' }}>Page Action Link:</label>
                <input
                    type="url"
                    value={pageActionLink}
                    onChange={(e) => setPageActionLink(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px' }}
                />

                <label style={{ marginBottom: '10px' }}>Page Hero Image (URL):</label>
                <input
                    type="url"
                    value={pageHeroImage}
                    onChange={(e) => setPageHeroImage(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px' }}
                />

                <label style={{ marginBottom: '10px' }}>Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px' }}
                />

                <SubmitButton type="button" onClick={handleCreatePageItem}>
                    Create Page Item
                </SubmitButton>
            </form>
            <BackButton onClick={() => router.push('/')}>Back to Home</BackButton>
        </FormContainer>
    );
};

export default CreatePageItem;
