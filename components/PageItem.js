// components/PageItem.js

import React from 'react';

const PageItem = ({ item }) => (
    <div className="page-item">
        <h3>{item.title}</h3>
        <p>{item.content}</p>
        <img src={item.page_hero_image} alt={item.title} />
        <a href={item.page_action_link} target="_blank" rel="noopener noreferrer">
            {item.page_action_link}
        </a>
    </div>
);

export default PageItem;
