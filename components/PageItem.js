// components/PageItem.js
import React from 'react';
import styled from 'styled-components';
import { CustomModal, ModalContent, ModalCloseButton, ModalImage, ModalTitle, ModalText, ModalLink, colors } from '../styles/styles';

const GridItem = styled.button`
  position: relative;
  border: 2px solid ${colors.primary};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const Symbol = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: ${colors.text};
`;

const PageItem = ({ item, onClick, showModal, onClose }) => {
    return (
        <GridItem onClick={() => onClick(item)} onMouseEnter={showModal ? () => {} : undefined}>
            <Symbol>{item.title.charAt(0)}</Symbol>
            <CustomModal isOpen={showModal} onRequestClose={onClose}>
                <ModalContent>
                    <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
                    <ModalTitle>{item.title}</ModalTitle>
                    <ModalImage src={item.page_hero_image} alt={item.title} />
                    <ModalText>{item.content}</ModalText>
                    <ModalLink href={item.page_action_link} target="_blank" rel="noopener noreferrer">
                        {item.page_action_link}
                    </ModalLink>
                </ModalContent>
            </CustomModal>
        </GridItem>
    );
};

export default PageItem;
