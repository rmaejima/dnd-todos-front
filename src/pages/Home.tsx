import React from 'react';
import styled from 'styled-components';
import { ImCalendar } from 'react-icons/im';
import { SafeArea } from 'components/common/SafeArea';

export const Home: React.VFC = () => {
  return (
    <SafeArea>
      <IconTitle>
        <ImCalendar />
        <h1>TODO</h1>
      </IconTitle>
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
