// components/PageItemList.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import PageItem from './PageItem';
import Pagination from './Pagination';
import styled from 'styled-components';
import EditPageItem from './EditPageItem'; // Import the new EditPageItem component

import {
    colors,
    ListItem as StyledListItem,
    ListContainer,
    ListContainerWrapper,
    PaginationButton, ButtonContainer, DeleteButton, EditButton,
} from '../styles/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const StyledPageItemList = styled(ListContainer)`
  ul {
    padding: 0;
  }
`;

const PageItemList = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editMode, setEditMode] = useState(false); // New state for tracking edit mode


    const isLoggedIn =
        typeof window !== 'undefined' &&
        typeof window.localStorage !== 'undefined' &&
        window.localStorage.getItem('isLoggedIn') === 'true';

    const fetchPageItems = async (page) => {
        try {
            const response = await axios.get(`/api/page-items?page=${page}`);
            setItems(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error fetching page items:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchPageItems(newPage);
    };

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setEditMode(false); // Close edit mode when modal is closed
    };

    const handleEdit = () => {
        setEditMode(true); // Set edit mode to true when edit button is clicked
    };


    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(items);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);

        setItems(reorderedItems);
    };

    useEffect(() => {
        fetchPageItems(currentPage);
    }, [currentPage]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this page item?');
        if (confirmDelete) {
            try {
                await axios.delete(`/api/page-items/${id}`);
                fetchPageItems();
            } catch (error) {
                console.error('Error deleting news item:', error);
            }
        }
    };
    return (
        <ListContainerWrapper>
            {editMode ? ( // Display EditPageItem component when edit mode is true
                <EditPageItem
                    selectedItem={selectedItem}
                    closeModal={closeModal}
                    fetchPageItems={fetchPageItems}
                />
            ) : (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="pageItems">
                    {(provided) => (
                        <StyledPageItemList {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided) => (
                                        <StyledListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={() => openModal(item)}
                                        >
                                            {item.title.charAt(0)}{' '}
                                            {isLoggedIn && (
                                            <ButtonContainer>
                                                <EditButton onClick={handleEdit}>Edit</EditButton>
                                                <DeleteButton onClick={() => handleDelete(item.id)}>
                                                    Delete
                                                </DeleteButton>
                                            </ButtonContainer>
                                                )}
                                        </StyledListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </StyledPageItemList>
                    )}
                </Droppable>
            </DragDropContext>
            )}<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </ListContainerWrapper>
    );
};

export default PageItemList;
