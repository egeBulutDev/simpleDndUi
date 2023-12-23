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

const DraggableContainer = styled.button`
  position: relative;
  border: 2px solid ${colors.primary};
  cursor: grab; /* Use "grab" cursor when not dragging */
  transition: background-color 0.3s ease;

  &:active {
    cursor: grabbing; /* Use "grabbing" cursor when dragging */
  }

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

const PageItem = ({ item, provided }) => {
    return (
        <DraggableContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <Symbol>{item.title.charAt(0)}</Symbol>
            <CustomModal>
                <ModalContent>
                    <ModalCloseButton>X</ModalCloseButton>
                    <ModalTitle>{item.title}</ModalTitle>
                    <ModalImage src={item.page_hero_image} alt={item.title} />
                    <ModalText>{item.content}</ModalText>
                    <ModalLink href={item.page_action_link} target="_blank" rel="noopener noreferrer">
                        {item.page_action_link}
                    </ModalLink>
                </ModalContent>
            </CustomModal>
        </DraggableContainer>
    );
};

export default PageItem;
