import React from 'react';
import styled from 'styled-components';
import { SideNav, SIDENAV_WIDTH } from './SideNav';

interface Props {
  children?: React.ReactNode;
}

export const SafeArea: React.VFC<Props> = ({ children }) => {
  return (
    <Container>
      <SideNav />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(p) => p.theme.colors.gray[50]};

  margin-left: ${SIDENAV_WIDTH};
  padding: 1rem 2rem;
`;
