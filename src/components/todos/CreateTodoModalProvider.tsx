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
        <p>モーダル</p>
        <button onClick={close}>CLOSE</button>
      </Modal>
    </>
  );
};

const FloatingActionContaner = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 4rem;
`;
