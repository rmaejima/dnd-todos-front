import React from 'react';
import styled from 'styled-components';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { SafeArea } from 'components/common/SafeArea';
import { IconButton } from 'components/common/IconButton';
import { colors } from 'utils/theme';

export const Home: React.VFC = () => {
  return (
    <SafeArea>
      <IconTitle>
        <FaRegCalendarAlt />
        <h1>TODO</h1>
      </IconTitle>
      <FloatingActionContaner>
        <IconButton color={colors.primary[500]}>
          <FaPlus />
        </IconButton>
      </FloatingActionContaner>
    </SafeArea>
  );
};

const IconTitle = styled.div`
  display: flex;
  align-items: center;

  color: ${(p) => p.theme.colors.text.base};
  font-size: 1.5rem;
  font-weight: bold;

  > h1 {
    margin-left: 1rem;
    color: ${(p) => p.theme.colors.text.base};
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const FloatingActionContaner = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 4rem;
`;
