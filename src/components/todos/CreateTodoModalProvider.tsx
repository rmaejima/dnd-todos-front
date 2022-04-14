import React from 'react';
import { useModal } from 'react-hooks-use-modal';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { IconButton } from 'components/common/IconButton';
import { colors } from 'utils/theme';

export const CreateTodoModalProvider: React.VFC = () => {
  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  return (
    <>
      <FloatingActionContaner>
        <IconButton color={colors.primary[500]} onClick={open}>
          <FaPlus />
        </IconButton>
      </FloatingActionContaner>
      <Modal>
        <ModalContainer>
          <ModalTitle>新しいTODO</ModalTitle>
          <button onClick={close}>CLOSE</button>
        </ModalContainer>
      </Modal>
    </>
  );
};

const FloatingActionContaner = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 4rem;
`;

const ModalContainer = styled.div`
  width: 35rem;
  background-color: #fff;
  border-radius: 1rem;

  padding: 1.5rem;
`;

const ModalTitle = styled.h1`
  margin-bottom: 1rem;
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1.5rem;
  font-weight: bold;
`;
