// pages/index.js
import React from 'react';
import PageItemList from '../components/PageItemList';
import styled from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
`;

const Home = () => {
    return (
        <HomeContainer>
            <h1>Page Items</h1>
            <PageItemList />
        </HomeContainer>
    );
};

export default Home;
