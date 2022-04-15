import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: () => void;
  className?: string;
  size?: number; //px
  color: string;
  children: React.ReactNode;
}
export const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  function IconButton({ onClick, className, children, size, color }, ref) {
    return (
      <Button
        className={className}
        onClick={onClick}
        $size={size}
        $bgColor={color}
        ref={ref}
      >
        {children}
      </Button>
    );
  },
);

const Button = styled.button<{ $size?: number; $bgColor: string }>`
  width: ${(p) => (p.$size ? `${p.$size}px` : '4rem')};
  height: ${(p) => (p.$size ? `${p.$size}px` : '4rem')};
  background-color: ${(p) => p.$bgColor};
  border-radius: 50%;

  color: #fff;
  font-size: 1.5rem;
  transition: 0.1s ${(p) => p.theme.easings.easeOut};

  &:hover {
    opacity: 0.8;
    box-shadow: ${(p) => p.theme.shadows.lg};
  }
`;
