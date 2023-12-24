// components/PageItem.js
import React from 'react';
import styled from 'styled-components';
import {
    CustomModal,
    ModalContent,
    ModalCloseButton,
    ModalImage,
    ModalTitle,
    ModalText,
    ModalLink,
    colors,
} from '../styles/styles';

const Container = styled.div`
  position: relative;
  border: 2px solid ${colors.primary};
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

const PageItem = ({ item, isOpen, onClose }) => {

    if (!item) {
        return null;
    }

    return (
        <Container>
            <Symbol>{item.title?.charAt(0)}</Symbol>
            {isOpen && (
                <CustomModal
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    contentLabel="Page Item Modal"
                >
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
            )}
        </Container>
    );
};

export default PageItem;
