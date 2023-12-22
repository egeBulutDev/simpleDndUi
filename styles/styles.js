// styles/styles.js
import styled from 'styled-components';
import Modal from 'react-modal';

export const colors = {
    primary: '#3498db',
    secondary: '#2ecc71',
    text: '#333',
    background: '#ecf0f1',
};

export const breakpoints = {
    tablet: '768px',
    desktop: '1200px',
};

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const GridContainer = styled.div`
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

export const GridItem = styled.button`
  position: relative;
  border: 2px solid ${colors.primary};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

export const Symbol = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: ${colors.text};
`;

export const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background-color: ${colors.background};
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${colors.primary};
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

export const ModalImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 10px;
  color: ${colors.primary};
`;

export const ModalText = styled.p`
  margin-bottom: 15px;
`;

export const ModalLink = styled.a`
  color: ${colors.primary};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${colors.secondary};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: ${colors.secondary};
  }
`;

// Additional styles for AuthContainer, AuthButton, HeaderButton

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AuthButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const HeaderButton = styled.span`
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-left: 10px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// Additional styles for FormContainer, SubmitButton, BackButton

export const FormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: ${colors.background};
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    color: ${colors.primary};
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  label {
    margin-bottom: 10px;
    color: ${colors.text};
  }

  input {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid ${colors.primary};
    border-radius: 5px;
  }
`;

export const SubmitButton = styled.button`
  padding: 8px;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

export const BackButton = styled.button`
  margin-top: 10px;
  padding: 8px;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.secondary};
  }
`;
