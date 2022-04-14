import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: () => void;
  className?: string;
  color: string;
  children: React.ReactNode;
}
export const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  function IconButton({ onClick, className, children, color }, ref) {
    return (
      <Button
        className={className}
        onClick={onClick}
        $bgColor={color}
        ref={ref}
      >
        {children}
      </Button>
    );
  },
);

const Button = styled.button<{ $bgColor: string }>`
  width: 4rem;
  height: 4rem;
  background-color: ${(p) => p.$bgColor};
  border-radius: 50%;

  color: #fff;
  font-size: 1.5rem;
  transition: 0.1s ${(p) => p.theme.easings.easeOut};

  &:hover {
    box-shadow: ${(p) => p.theme.shadows.lg};
  }
`;
