// components/PageItemList.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import PageItem from './PageItem';
import Pagination from './Pagination';
import styled from 'styled-components';
import { colors, GridItem as StyledGridItem } from '../styles/styles';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.primary};
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const PageItemList = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);

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
    };

    useEffect(() => {
        fetchPageItems(currentPage);
    }, [currentPage]);

    return (
        <div>
            <GridContainer>
                {items.map((item) => (
                    <StyledGridItem key={item.id} onClick={() => openModal(item)}>
                        <PageItem item={item} onClick={() => openModal(item)} />
                    </StyledGridItem>
                ))}
            </GridContainer>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            {/* Modal for displaying detailed item information */}
            {selectedItem && (
                <PageItem
                    item={selectedItem}
                    onClick={() => {}}
                    showModal={true}
                    onClose={() => closeModal()}
                />
            )}
        </div>
    );
};

export default PageItemList;
