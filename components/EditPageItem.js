// components/EditPageItem.js
import React, { useState } from 'react';
import axios from '../utils/axios';
import {
    ModalContent,
    ModalCloseButton,
    ModalTitle,
    ModalImage,
    ModalText,
    ModalLink,
    SubmitButton,
    BackButton,
} from '../styles/styles';

const EditPageItem = ({ selectedItem, closeModal, fetchPageItems }) => {
    const [editedItem, setEditedItem] = useState(selectedItem);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`/api/page-items/${selectedItem.id}`, editedItem);
            closeModal();
            fetchPageItems();
        } catch (error) {
            console.error('Error updating page item:', error);
        }
    };

    return (
        <ModalContent>
            <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
            <ModalTitle>Edit Item</ModalTitle>
            <label>Title:</label>
            <input type="text" name="title" value={editedItem.title} onChange={handleChange} />
            <label>Image:</label>
            <input type="text" name="page_hero_image" value={editedItem.page_hero_image} onChange={handleChange} />
            <label>Content:</label>
            <textarea name="content" value={editedItem.content} onChange={handleChange} />
            <label>Action Link:</label>
            <input type="text" name="page_action_link" value={editedItem.page_action_link} onChange={handleChange} />
            <SubmitButton onClick={handleSubmit}>Submit Changes</SubmitButton>
            <BackButton onClick={closeModal}>Cancel</BackButton>
        </ModalContent>
    );
};

export default EditPageItem;
