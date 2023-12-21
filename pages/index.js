// pages/index.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'
import PageItem from '../components/PageItem';
import Pagination from '../components/Pagination';

const Home = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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

    useEffect(() => {
        fetchPageItems(currentPage);
    }, [currentPage]);

    return (
        <div>
            <h1>Page Items</h1>
            <div className="grid-container">
                {items.map((item) => (
                    <PageItem key={item.id} item={item} />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default Home;
