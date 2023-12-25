// components/PageItemList.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import PageItem from './PageItem';
import Pagination from './Pagination';
import styled from 'styled-components';
import EditPageItem from './EditPageItem';

import {
    ListItem as StyledListItem,
    ListContainer, ListContainerWrapper,
    ButtonContainer, DeleteButton, EditButton, InspectButton,
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemOrder, setItemOrder] = useState([]); // New state for tracking item order

    const isLoggedIn =
        typeof window !== 'undefined' &&
        typeof window.localStorage !== 'undefined' &&
        window.localStorage.getItem('isLoggedIn') === 'true';

    const fetchPageItems = async (page) => {
        try {
            const response = await axios.get(`/api/page-items?page=${page}`);
            // Sort the items based on the 'order' property
            const sortedItems = response.data.data.sort((a, b) => a.order - b.order);
            setItems(sortedItems);
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

    const handleEdit = () => {
        setEditMode(true);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(items);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);

        setItems(reorderedItems);
        setItemOrder(reorderedItems.map((item) => item.id)); // Update item order state
    };

    const handleSaveOrder = async () => {
        try {
            await axios.post('/api/page-items/save-order', { order: itemOrder });
            // Fetch the updated items after saving the order
            const response = await axios.get(`/api/page-items?page=${currentPage}`);
            setItems(response.data.data);
        } catch (error) {
            console.error('Error saving item order:', error);
        }
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

    const handleInspect = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
        setEditMode(false);
    };

    return (
        <ListContainerWrapper>
            {isLoggedIn && (
                <div>
                    <button onClick={handleSaveOrder}>Save Order</button>
                </div>
            )}
            {editMode && (
                <EditPageItem
                    selectedItem={selectedItem}
                    closeModal={closeModal}
                    fetchPageItems={fetchPageItems}
                />
            )}
            {isLoggedIn && (
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
                                            >
                                                {item.title.charAt(0)}{' '}
                                                <ButtonContainer>
                                                    {isLoggedIn && (
                                                        <EditButton onClick={() => handleEdit(item)}>Edit</EditButton>
                                                    )}
                                                    <InspectButton onClick={() => handleInspect(item)}>Inspect</InspectButton>
                                                    {isLoggedIn && (
                                                        <DeleteButton onClick={() => handleDelete(item.id)}>
                                                            Delete
                                                        </DeleteButton>
                                                    )}
                                                </ButtonContainer>
                                            </StyledListItem>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </StyledPageItemList>
                        )}
                    </Droppable>
                </DragDropContext>
            )}

            {!isLoggedIn && (
                <StyledPageItemList>
                    {items.map((item, index) => (
                        <StyledListItem key={item.id}>
                            {item.title.charAt(0)}{' '}
                            <ButtonContainer>
                                <InspectButton onClick={() => handleInspect(item)}>Inspect</InspectButton>
                            </ButtonContainer>
                        </StyledListItem>
                    ))}
                </StyledPageItemList>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <PageItem isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />
        </ListContainerWrapper>
    );
};

export default PageItemList;